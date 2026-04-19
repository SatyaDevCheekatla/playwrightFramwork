const HomePage = require('../pageObjects/HomePage');
const Registration = require('../pageObjects/Registration');
const OpenAccount = require('../pageObjects/OpenAccountPage');
const LoginPage = require('../pageObjects/LoginPage');

class POMManager {
    constructor(page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.registrationPage = new Registration(page);
        this.openAccountPage = new OpenAccount(page);
        this.loginPage = new LoginPage(page);
    }


    getHomePage() {
        return this.homePage;
    }

    getRegistrationPage() {
        return this.registrationPage;
    }

     getOpenAccountPage() {
        return this.openAccountPage;
    }

    getLoginPage() {
        return this.loginPage;
    }
    
}
module.exports = POMManager;