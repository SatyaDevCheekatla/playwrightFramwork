const { expect } = require('@playwright/test');
const BasePage = require('../common/BasePage');

class Registration extends BasePage {

    constructor(page) {
        super(page);
        // page.getByRole('textbox', { name: 'Address:' });
        this.registrationPageLocator =  this.page.getByRole('link', { name: 'Register' });
        this.registratiionPageText =  this.page.getByText('Signing up is easy!');
        this.customerFirstName =  this.page.locator('[id="customer.firstName"]');
        this.customerLastName =  this.page.locator('[id="customer.lastName"]');
        this.customerAddress =  this.page.locator('[id="customer.address.street"]');
        this.customerCity =  this.page.locator('[id="customer.address.city"]');
        this.customerState =  this.page.locator('[id="customer.address.state"]');
        this.customerZipCode =  this.page.locator('[id="customer.address.zipCode"]');
        this.customerPhone =  this.page.locator('[id="customer.phoneNumber"]');
        this.customerSsn =  this.page.locator('[id="customer.ssn"]');
        this.customerUsername =  this.page.locator('[id="customer.username"]');
        this.customerPassword =  this.page.locator('[id="customer.password"]');
        this.confirmCustomerPassword =  this.page.locator('[id="repeatedPassword"]');
        this.submitButton =  this.page.getByRole('button', { name: 'Register' });
    }

    async navigateToRegistrationPage(){
        await this.click(this.registrationPageLocator);
    }

    async verifyRegistrationPageUrl(){
        let currentUrl = await this.page.url();
        await expect(currentUrl).toContain('register.htm');
    }

    async validateRegistrationPageTitle(){
        let text = await this.getText(this.registratiionPageText);
        await expect(text).toEqual('Signing up is easy!');
    }

    async registerUser(firstName, lastName, address, city, state, zipCode, phone, ssn, username, password){
        // Wait for first field to be visible and interactive
        await this.customerFirstName.waitFor({ state: 'visible', timeout: 5000 });
        await this.page.waitForTimeout(500);
        
        // Clear and fill first name
        await this.customerFirstName.click();
        await this.customerFirstName.fill('');
        await this.customerFirstName.fill(firstName);
        await this.page.waitForTimeout(300);
        
        // Fill other fields
        await this.customerLastName.click();
        await this.customerLastName.fill(lastName);
        await this.page.waitForTimeout(300);
        
        await this.customerAddress.click();
        await this.customerAddress.fill(address);
        await this.page.waitForTimeout(300);
        
        await this.customerCity.click();
        await this.customerCity.fill(city);
        await this.page.waitForTimeout(300);
        
        await this.customerState.click();
        await this.customerState.fill(state);
        await this.page.waitForTimeout(300);
        
        await this.customerZipCode.click();
        await this.customerZipCode.fill(zipCode);
        await this.page.waitForTimeout(300);
        
        await this.customerPhone.click();
        await this.customerPhone.fill(phone);
        await this.page.waitForTimeout(300);
        
        await this.customerSsn.click();
        await this.customerSsn.fill(ssn);
        await this.page.waitForTimeout(300);
        
        await this.customerUsername.click();
        await this.customerUsername.fill(username);
        await this.page.waitForTimeout(300);
        
        await this.customerPassword.click();
        await this.customerPassword.fill(password);
        await this.page.waitForTimeout(300);
        
        await this.confirmCustomerPassword.click();
        await this.confirmCustomerPassword.fill(password);
        await this.page.waitForTimeout(500);
        
        await this.click(this.submitButton);
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1500);

        return [username,password];
    }

    async verifySuccessfulRegistration() {
        // Wait for the page to fully load after registration
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(1000);
        
        await expect(
            this.page.getByText('Your account was created successfully')
        ).toBeVisible({ timeout: 15000 });

        await expect(this.page.locator('h1')).toContainText('Welcome');
    }
} module.exports = Registration;
