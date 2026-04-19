const { test } = require('@playwright/test');

class BasePage {

    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        console.log(`[ACTION] Navigating to URL: ${url}`);
        await this.page.goto(url);
        console.log(`[ACTION] ✓ Navigation completed to: ${url}`);
    }

    async click(locator) {
        try {
            const locatorString = locator.toString();
            console.log(`[ACTION] Clicking on element: ${locatorString}`);
            await locator.click();
            console.log(`[ACTION] ✓ Successfully clicked on element: ${locatorString}`);
        } catch (error) {
            console.error(`[ERROR] Failed to click: ${error.message}`);
            throw error;
        }
    }

    async type(locator, value) {
        try {
            const locatorString = locator.toString();
            console.log(`[ACTION] Filling text "${value.substring(0, 50)}" in element: ${locatorString}`);
            await locator.fill(value);
            console.log(`[ACTION] ✓ Successfully filled text in element: ${locatorString}`);
        } catch (error) {
            console.error(`[ERROR] Failed to fill text: ${error.message}`);
            throw error;
        }
    }

    async getText(locator) {
        try {
            const locatorString = locator.toString();
            console.log(`[ACTION] Getting text from element: ${locatorString}`);
            const text = await locator.textContent();
            console.log(`[ACTION] ✓ Retrieved text: "${text}"`);
            return text;
        } catch (error) {
            console.error(`[ERROR] Failed to get text: ${error.message}`);
            throw error;
        }
    }

    async waitForElement(locator, timeout = 5000) {
        try {
            const locatorString = locator.toString();
            console.log(`[ACTION] Waiting for element to be visible: ${locatorString}`);
            await locator.waitFor({ state: 'visible', timeout });
            console.log(`[ACTION] ✓ Element is now visible: ${locatorString}`);
        } catch (error) {
            console.error(`[ERROR] Element did not appear: ${error.message}`);
            throw error;
        }
    }
}

module.exports = BasePage;