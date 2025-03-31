const { chromium } = require('playwright');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('chai'); // Make sure this works in CommonJS

// Store browser context and page
let browser;
let context;
let page;

Before(async function () {
    try {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        page = await context.newPage();
    } catch (error) {
        console.error("Error launching browser:", error);
        throw error;
    }
});

After(async function () {
    try {
        if (page && !page.isClosed()) {
            await context.storageState({ path: 'state.json' });
        } else {
            console.log('Page is closed; cannot save state');
        }
        if (browser) {
            await browser.close();
        }
    } catch (error) {
        console.error("Error closing browser:", error);
    }
});

Given('the user is on the signup page', async function () {
    try {
        await page.goto('https://automationexercise.com/login');

        // Handle the cookie consent button
        const consentButtonSelector = 'button.fc-button.fc-cta-consent.fc-primary-button';
        if (await page.isVisible(consentButtonSelector)) {
            await page.click(consentButtonSelector);
            console.log("Cookie consent accepted.");
        }
    } catch (error) {
        console.error('Error navigating to signup page:', error);
        throw error;
    }
});

When('the user enters a valid username, email, and password', async function () {
    try {
        await page.click('a[href="/login"]');  // Clicks the Signup/Login link

        await page.fill('[data-qa="signup-name"]', 'Test User');

        // Generate a unique email using Date.now()
        const uniqueEmail = `testuser_${Date.now()}@example.com`;

        await page.fill('[data-qa="signup-email"]', uniqueEmail);

    } catch (error) {
        console.error('Error entering user details:', error);
        throw error;
    }
});

When('clicks the {string} button', async function (buttonText) {
    try {
        // Locate the button using the text passed as argument (e.g., 'Signup')
        const button = await page.locator(`button[data-qa="signup-button"]:text("${buttonText}")`);
        await button.click();
    } catch (error) {
        console.error(`Error clicking "${buttonText}" button:`, error);
        throw error;
    }
});

Then('the user should be redirected to the account page', async function () {
    try {
        // Ensure the title appears on the page
        const title = await page.locator('h2.title.text-center');
        const titleText = await title.innerText();

        // Verify the title text
        expect(titleText).to.include('Enter Account Information');
    } catch (error) {
        console.error('Error verifying account information title:', error);
        throw error;
    }
});

Then('the user should see and click the logout button', async function () {
    try {
        const logoutButton = await page.locator('button#logout'); // Ensure this selector is correct
        await logoutButton.click();
    } catch (error) {
        console.error('Error clicking logout button:', error);
        throw error;
    }
});

Then('the user should see a welcome message', async function () {
    try {
        const welcomeMessage = await page.innerText('h1');
        expect(welcomeMessage).to.include('Welcome, testuser');
    } catch (error) {
        console.error('Error verifying welcome message:', error);
        throw error;
    }
});

// Login test case
Given('the user is on the login page', async function () {
    try {
        await page.goto('https://automationexercise.com/login');
        await page.waitForSelector('button.fc-button.fc-cta-consent.fc-primary-button', {
            visible: true,
            timeout: 30000,
        });
        console.log('Login page is loaded');
    } catch (error) {
        console.error('Error during login page navigation:', error);
        throw error;
    }
});

When('the user enters a valid username and password', async function () {
    try {
        await page.fill('input[name="username"]', 'validuser');
        await page.fill('input[name="password"]', 'password123');
    } catch (error) {
        console.error('Error entering login credentials:', error);
        throw error;
    }
});

When('the user clicks the "Login" button', async function () {
    try {
        await page.click('button[type="submit"]');
    } catch (error) {
        console.error('Error clicking login button:', error);
        throw error;
    }
});

Then('the user should be redirected to the homepage', async function () {
    try {
        await page.waitForSelector('div.homepage-header', { timeout: 30000 });
    } catch (error) {
        console.error('Error during homepage redirection:', error);
        throw error;
    }
});

// Add product to cart test case
Given('the user is on the homepage', async function () {
    try {
        await page.goto('https://automationexercise.com');
        await page.waitForSelector('button.add-to-cart', { timeout: 30000 });
    } catch (error) {
        console.error('Error during homepage navigation:', error);
        throw error;
    }
});

When('the user selects a product', async function () {
    try {
        await page.click('button.add-to-cart');
    } catch (error) {
        console.error('Error selecting product:', error);
        throw error;
    }
});

When('the user clicks the "Add to cart" button', async function () {
    try {
        await page.click('button.add-to-cart');
    } catch (error) {
        console.error('Error clicking add to cart button:', error);
        throw error;
    }
});

Then('the product should be added to the cart', async function () {
    try {
        const cartCount = await page.innerText('span.cart-count');
        expect(Number(cartCount)).to.be.greaterThan(0);
    } catch (error) {
        console.error('Error verifying product in cart:', error);
        throw error;
    }
});

Given('the user has added a product to the cart', async function () {
    try {
        // Navigate to the homepage and add a product to the cart
        await page.goto('https://automationexercise.com');
        await page.waitForSelector('button.add-to-cart', { timeout: 30000 });

        // Select and add a product to the cart
        await page.click('button.add-to-cart');
        console.log('Product added to the cart');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
});

When('the user clicks on the "View Cart" button', async function () {
    try {
        // Click the 'View Cart' button
        const viewCartButton = await page.locator('a[href="/view_cart"]');
        await viewCartButton.click();
        console.log('Clicked "View Cart" button');
    } catch (error) {
        console.error('Error clicking "View Cart" button:', error);
        throw error;
    }
});

When('clicks the "Proceed to Checkout" button', async function () {
    try {
        // Click the 'Proceed to Checkout' button
        const proceedToCheckoutButton = await page.locator('button[data-qa="proceed-to-checkout"]');
        await proceedToCheckoutButton.click();
        console.log('Clicked "Proceed to Checkout" button');
    } catch (error) {
        console.error('Error clicking "Proceed to Checkout" button:', error);
        throw error;
    }
});

Then('the user should be on the checkout page', async function () {
    try {
        // Verify the user is on the checkout page
        await page.waitForSelector('h2.title.text-center', { timeout: 30000 });
        const pageTitle = await page.innerText('h2.title.text-center');
        expect(pageTitle).to.include('Enter Account Information');
        console.log('User is on the checkout page');
    } catch (error) {
        console.error('Error verifying checkout page:', error);
        throw error;
    }
});

Then('the total price should be displayed correctly', async function () {
    try {
        // Check if the total price is displayed correctly
        const totalPriceElement = await page.locator('span#total_price');
        const totalPrice = await totalPriceElement.innerText();
        expect(totalPrice).to.match(/^\$[\d,]+\.\d{2}$/); // Check if price format is correct (e.g., $50.00)
        console.log(`Total price displayed: ${totalPrice}`);
    } catch (error) {
        console.error('Error verifying total price:', error);
        throw error;
    }
});
