const { expect } = require('@playwright/test');
const BasePage = require('../common/BasePage');

class OpenAccountPage extends BasePage {
    
    constructor(page) {
        super(page);
        this.openAccountLink = this.page.getByRole('link',{name:'Open New Account'});
        this.accountTypeDropDown = this.page.locator('#type');
        this.fromAccountDropDown = this.page.locator('#fromAccountId');
        this.openAccountButton = this.page.getByRole('button', { name: 'Open New Account' });
        this.accountCreationMessage = this.page.getByRole('heading', { name: 'Account Opened!' });
        this.accountNumber = this.page.getByRole('link', { name: /^\d+$/ });
    }

    async navigateToOpenAccountPage(){
        await this.openAccountLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.click(this.openAccountLink);
        await this.page.waitForLoadState('networkidle');
    }

    async validateOpenAccountPageTitle() {
        await expect(
            this.page.getByRole('heading', { name: 'Open New Account', level: 1 })
        ).toBeVisible();
    }

    async selectAccountType(accountType){
        await this.accountTypeDropDown.selectOption(accountType);
        await this.page.waitForTimeout(500);
        
        const firstOption = await this.fromAccountDropDown.locator('option').first();
        const firstAccountValue = await firstOption.getAttribute('value');
        await this.fromAccountDropDown.selectOption(firstAccountValue);
        await this.page.waitForTimeout(500);
        
        await this.click(this.openAccountButton);
        await this.page.waitForLoadState('networkidle');
    }

    async verifyAccountCreation(){
        await this.page.waitForLoadState('networkidle');
        await expect(this.accountCreationMessage).toBeVisible({ timeout: 10000 });
        let accountNumberText = await this.getText(this.accountNumber);
        return accountNumberText.trim();
    }

}

module.exports = OpenAccountPage;
