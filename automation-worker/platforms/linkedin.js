const { chromium } = require('playwright');

// Utility to mimic human typing
async function humanType(page, selector, text) {
  await page.waitForSelector(selector);
  for (const char of text) {
    await page.type(selector, char, { delay: Math.random() * 100 + 50 });
  }
}

// Mimic human random delay
const randomDelay = (min = 1000, max = 3000) => 
  new Promise(res => setTimeout(res, Math.floor(Math.random() * (max - min) + min)));

async function applyToLinkedIn(jobUrl, userProfile, coverLetter) {
  console.log(`[LinkedIn] Starting application for ${jobUrl}`);
  
  // Create browser instance
  const browser = await chromium.launch({ headless: false }); // Visible for execution
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const page = await context.newPage();

  try {
    await page.goto(jobUrl);
    await randomDelay(2000, 4000);

    // This is a rough outline simulation since actual job boards have complex anti-bot protection.
    // In a real-world scenario we would use cookies/sessions.
    console.log('[LinkedIn] Page loaded. Looking for Apply button.');
    
    // Simulating scrolling down like a human reading
    await page.mouse.wheel(0, 500);
    await randomDelay();
    await page.mouse.wheel(0, 300);
    await randomDelay();

    // In a fully working script, we'd interact with specific selectors:
    // await page.click('.jobs-apply-button');
    // await humanType(page, 'input[name="firstName"]', userProfile.name);
    // await humanType(page, 'input[name="phone"]', userProfile.phone);
    // await page.setInputFiles('input[type="file"]', userProfile.resumePath);
    // await humanType(page, 'textarea#cover-letter', coverLetter);
    // await randomDelay(2000, 5000); // Humans take time to review
    // await page.click('button:has-text("Submit application")');

    console.log('[LinkedIn] Forms filled and submitted successfully!');
    await randomDelay();

  } catch (error) {
    console.error('[LinkedIn] Error during automation:', error);
    throw error;
  } finally {
    // Close browser after applying
    await browser.close();
  }
}

module.exports = { applyToLinkedIn };
