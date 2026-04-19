const { test, expect } = require('@playwright/test');
const ContextManager = require('../src/utils/ContextManager');
const POMManager = require('../src/common/POMManager');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(__dirname, '../resources/testdata.json');

test.describe('Registration Tests', () => {

    test.describe.configure({ mode: 'serial' });

    let page;
    let pomManager;
    let credentials;
    let testData = {};
    let browserName;

    test.beforeAll(async ({ browserName: bn }) => {
        browserName = bn;
        const context = await ContextManager.init(browserName);
        page = await context.newPage();
        pomManager = new POMManager(page);
    });

    test.afterAll(async () => {
        fs.writeFileSync(CREDENTIALS_PATH, JSON.stringify(testData, null, 2));
        console.log('Saved test data:', testData);
        await ContextManager.tearDown(browserName);
    });

    test('Validate Home Page', async () => {
        await test.step('Navigate to Home Page', async () => {
            const homePage = pomManager.getHomePage();
            await homePage.navigateToHomePage();
        });

        await test.step('Verify Home Page URL', async () => {
            const homePage = pomManager.getHomePage();
            await homePage.verifyHomePageURL();
        });

        await test.step('Wait for page to load', async () => {
            await page.waitForLoadState('domcontentloaded');
        });

        await test.step('Validate Home Page Title', async () => {
            const homePage = pomManager.getHomePage();
            await homePage.validateHomePageTitle();
        });
    });

    test('Perform User Registration', async () => {
        const registrationPage = pomManager.getRegistrationPage();
        const uniqueUsername = `admin${Date.now()}`; // Generate unique username with timestamp
        
        await test.step('Navigate to Registration Page', async () => {
            await registrationPage.navigateToRegistrationPage();
        });

        await test.step('Verify Registration Page URL', async () => {
            await registrationPage.verifyRegistrationPageUrl();
        });

        await test.step('Validate Registration Page Title', async () => {
            await registrationPage.validateRegistrationPageTitle();
        });

        await test.step('Register User with credentials', async () => {
            credentials = await registrationPage.registerUser(
                'Ravi',
                'Kumar',
                '45 MG Road',
                'Hyderabad',
                'Telangana',
                '500001',
                '9876543210',
                '321-54-9876',
                uniqueUsername,
                'pass'
            );
        });

        await test.step('Verify Successful Registration', async () => {
            await registrationPage.verifySuccessfulRegistration();
        });
       
        testData.userName = credentials[0];
        testData.password = credentials[1];
        console.log(`[TEST DATA] Registered user: ${credentials[0]}`);
    });

    test('Open Account for Registered User', async () => {
        const openAccountPage = pomManager.getOpenAccountPage();
        
        await test.step('Navigate to Open Account Page', async () => {
            await openAccountPage.navigateToOpenAccountPage();
        });

        await test.step('Validate Open Account Page Title', async () => {
            await openAccountPage.validateOpenAccountPageTitle();
        });

        await test.step('Select Account Type - SAVINGS', async () => {
            await openAccountPage.selectAccountType('SAVINGS');
        });

        await test.step('Verify Account Creation', async () => {
            const accountNumber = await openAccountPage.verifyAccountCreation();
            console.log(`[TEST DATA] Newly created account number: ${accountNumber}`);
            testData.accountNumber = accountNumber;
        });
    });

});