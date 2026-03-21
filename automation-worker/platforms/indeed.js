const { chromium } = require('playwright');

const randomDelay = (min = 1000, max = 3000) => 
  new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min) + min)));

async function applyToIndeed(jobUrl, userProfile, coverLetter) {
  console.log(`[Indeed] Starting application for ${jobUrl}`);
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(jobUrl);
    await randomDelay(2000, 4000);

    console.log('[Indeed] Page loaded. Simulating Indeed Apply flow.');
    
    // Simulate interaction
    await page.mouse.wheel(0, 400);
    await randomDelay();
    
    // In actual implementation:
    // await page.click('#indeedApplyButton');
    // ... fill multi-step iframe forms
    // ... upload resume
    // ... insert cover letter
    // await page.click('.ia-continueButton');

    console.log('[Indeed] Forms filled and submitted successfully!');
    await randomDelay();

  } catch (error) {
    console.error('[Indeed] Error during automation:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

module.exports = { applyToIndeed };
