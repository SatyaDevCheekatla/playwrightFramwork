const { expect } = require('@playwright/test');
const BasePage = require('../common/BasePage');
const testData = require('../../resources/testdata.json');

class LoginPage extends BasePage {

    constructor(page) {
        super(page);
        this.usernameInput = this.page.locator('input[name="username"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.loginButton = this.page.locator('input[value="Log In"]');
        this.message = this.page.getByText('Welcome');
    }

    async login() {
        await this.usernameInput.fill(testData.userName);
        await this.passwordInput.fill(testData.password);
        await this.loginButton.click();
    }

    async verifySuccessfulLogin() {
        await expect(this.message).toBeVisible({ timeout: 10000 });
    }
}

module.exports = LoginPage;
