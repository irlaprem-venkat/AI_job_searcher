require('dotenv').config();
const { Worker } = require('bullmq');
const IORedis = require('ioredis');
const { createClient } = require('@supabase/supabase-js');
const { applyToLinkedIn } = require('./platforms/linkedin');

const redisConnection = new IORedis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || '',
  maxRetriesPerRequest: null
});

const supabase = createClient(
  process.env.SUPABASE_URL || 'http://localhost:54321', // mock
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'mock'
);

const worker = new Worker('job-apply-queue', async job => {
  console.log(`[Worker] Started processing job ${job.id}`);
  const { applicationId, jobUrl, platform, userProfile, coverLetter } = job.data;

  try {
    // 1. Mark application as 'applying'
    await supabase.from('applications').update({ status: 'applying' }).eq('id', applicationId);

    // 2. Delegate to platform script
    if (platform.toLowerCase() === 'linkedin') {
      await applyToLinkedIn(jobUrl, userProfile, coverLetter);
    } else {
      throw new Error(`Unsupported platform: ${platform}`);
    }

    // 3. Mark application as 'applied'
    await supabase.from('applications').update({ status: 'applied', applied_at: new Date() }).eq('id', applicationId);
    console.log(`[Worker] Successfully applied to job ${job.id}`);

  } catch (error) {
    console.error(`[Worker] Failed applying to job ${job.id}:`, error);
    await supabase.from('applications').update({ status: 'failed' }).eq('id', applicationId);
    throw error;
  }
}, { connection: redisConnection });

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

console.log('Automation Worker is running...');
