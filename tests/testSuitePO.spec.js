const { test, expect, request } = require('@playwright/test');

//Json-->String-->JS object (this we do to avoid issues with multiple encoding tectinques-UTF 8 or soemthing)
const dataset = JSON.parse(JSON.stringify(require('../testData/testData.json')));

// import { DashBoardPage } from '../pageObjects/DashboardPage';
// import { LoginPage } from '../pageObjects/LoginPage';
// import { CheckoutPage } from '../pageObjects/CheckoutPage';
import { POManager } from '../pageObjects/POManager';

let loginPage;
let dashboardPage;
let checkoutPage;
let poManagerPage;

for (const data of dataset) {
    test.describe(`User: ${data.email}`, () => {
        test.beforeAll(async ({ browser }) => {
            // Create a single instance of POManager for all tests in this describe block
            const page = await browser.newPage();
            poManagerPage = new POManager(page);
            loginPage = poManagerPage.getLoginPage();
            dashboardPage = poManagerPage.getDashBoardPage();
            checkoutPage = poManagerPage.getCheckoutPage();

            // Log in using current user's credentials
            await loginPage.landingOn(data.url);
            await loginPage.validLogin(data.email, data.password);
        });

        test(`Verify all product titles for ${data.item}`, async () => {
            await dashboardPage.verifyProducts();
        });

        test(`Add product to cart ${data.item}`, async () => {
            await dashboardPage.addProductToCart(data.item);
            console.log('Item ' + data.item + ' is added to cart');
        });

        test(`Check if Item is available in cart ${data.item}`, async () => {
            await checkoutPage.itemAvailableInCart(data.item);
        });

        test(`Verify Checkout Process for ${data.item}`, async () => {
            await checkoutPage.checkoutProcess('ind', 'India');
            await checkoutPage.validateEmailonCheckout(data.email);
        });
    });
}