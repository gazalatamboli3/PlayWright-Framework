import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Page } from 'playwright';

let page: Page;
console.log('Loading or not')
Given('Login to application with {string} and {string}', async function(userName: string, password: string) {
    debugger;
    page = await this.browser.newPage(); // Assuming browser is initialized globally
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("//input[@id='userEmail']").fill(userName); // Fill in email dynamically
    await page.locator("//input[@id='userPassword']").fill(password); // Fill in password dynamically
    await page.locator("//*[@id='login']").click();
    await page.waitForLoadState('networkidle'); // Wait for the page to load completely
});

When('Add {string} to cart', async function(item: string) {
    const products = page.locator('.card-body'); // Get all products
    const count = await products.count(); // Count number of products

    console.log('Total products are ' + count);

    for (let i = 0; i < count; i++) {
        const productName = await products.nth(i).locator('b').textContent(); // Get product name
        if (productName === item) {
            await products.nth(i).locator('text=Add To Cart').click(); // Add the item to the cart
            break;
        }
    }
});

Then('Verify {string} is added in cart', async function(item: string) {
    await page.locator("[routerlink*='cart']").click(); // Go to the cart
    await page.locator('div li').first().waitFor(); // Wait for the cart items to load

    const itemCheckout = `h3:has-text('${item}')`; // Selector for the item in the cart
    const isItemVisible = await page.locator(itemCheckout).isVisible(); // Check if the item is visible

    console.log(isItemVisible);
    expect(isItemVisible).toBeTruthy(); // Assert that the item is in the cart
});
