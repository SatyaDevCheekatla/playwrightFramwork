import { expect } from '@playwright/test';
const BasePage = require('../common/BasePage');
const EnvManager = require('../utils/EnvManager');

class HomePage extends BasePage {

    constructor(page) {
        super(page);
        this.url = EnvManager.get('url');
    }

    async navigateToHomePage(){
        await this.navigate(this.url);
    }

    async verifyHomePageURL(){
        let currentUrl = await this.page.url();
        await expect(currentUrl).toBe(this.url);
    }

    async validateHomePageTitle(){
        let title = await this.page.title();
        await expect(title).toBe('ParaBank | Welcome | Online Banking');
    }
} module.exports = HomePage;