const { setWorldConstructor, Before, After } = require('@cucumber/cucumber'); // Include Before
const { chromium } = require('playwright');

class CustomWorld {
    constructor() {
        this.page = null;
        this.context = null;
        this.browser = null;
    }

    async openBrowser() {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();
    }
}

// Register Before Hook
Before(async function () {
    try {
        this.browser = await chromium.launch({ headless: false });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        // Navigate to the initial page
        await this.page.goto('https://automationexercise.com');

        // Handle the cookie consent button if it appears
        const consentButtonSelector = 'button.fc-button.fc-cta-consent.fc-primary-button';
        if (await this.page.isVisible(consentButtonSelector)) {
            await this.page.click(consentButtonSelector);
            console.log("Cookie consent accepted.");
        }
    } catch (error) {
        console.error("Error launching browser:", error);
        throw error;
    }
});

// Register After Hook
After(async function () {
    if (this.page) {
        try {
            await this.page.context().storageState({ path: 'state.json' });
        } catch (error) {
            console.warn('Could not save state:', error);
        }
    }
    if (this.browser) {
        await this.browser.close();
    }
});

setWorldConstructor(CustomWorld);
