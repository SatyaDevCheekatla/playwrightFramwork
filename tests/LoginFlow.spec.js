const { test, expect } = require('@playwright/test');
const ContextManager = require('../src/utils/ContextManager');
const POMManager = require('../src/common/POMManager');
const fs = require('fs');
const path = require('path');

// Ensure screenshots directory exists
const screenshotsDir = path.join(__dirname, '../screenshots');
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
}

test.describe('Login Flow Tests', () => {

    test.describe.configure({ mode: 'serial' });

    let page;
    let pomManager;
    let browserName;

    test.beforeEach(async ({ browserName: bn }) => {
        if (!page) {
            browserName = bn;
            const context = await ContextManager.init(browserName);
            page = await context.newPage();
            pomManager = new POMManager(page);
        }
    });

    test.afterEach(async () => {
        if (page) {
            await page.screenshot({
                path: `screenshots/${Date.now()}_screenshot.png`,
                fullPage: true
            }).catch(err => console.log('Screenshot failed:', err.message));
        }
    });

    test.afterAll(async () => {
        if (page) {
            await page.close().catch(() => {});
        }
        if (browserName) {
            await ContextManager.tearDown(browserName).catch(() => {});
        }
    });

    test('Validate navigation to Login Page', async () => {
        await test.step('Navigate to Home Page', async () => {
            const homePage = pomManager.getHomePage();
            await homePage.navigateToHomePage();
        });

        await test.step('Verify Home Page URL', async () => {
            const homePage = pomManager.getHomePage();
            await homePage.verifyHomePageURL();
        });

        await test.step('Validate Home Page Title', async () => {
            const homePage = pomManager.getHomePage();
            await homePage.validateHomePageTitle();
        });
    });

    test('Perform Login', async () => {
        await test.step('Login with saved credentials', async () => {
            const loginPage = pomManager.getLoginPage();
            await loginPage.login();
        });

        await test.step('Wait for page transition', async () => {
            await page.waitForTimeout(10000);
        });

        await test.step('Take final screenshot', async () => {
            await page.screenshot({
                path: `screenshots/${Date.now()}_login_success.png`,
                fullPage: true
            });
        });
    });

});
