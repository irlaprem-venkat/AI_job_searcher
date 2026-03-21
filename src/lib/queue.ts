import { Queue } from 'bullmq';

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD || '',
};

export const applyQueue = new Queue('job-apply-queue', { connection });

export async function addJobToQueue(jobData: any) {
  return await applyQueue.add('apply', jobData, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  });
}
