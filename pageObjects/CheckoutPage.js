import { expect } from "@playwright/test";
export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cart = this.page.locator("[routerlink*='cart']");
        this.orderTiles = this.page.locator('div li');
        this.checkout = this.page.locator("text=Checkout");
        this.country = this.page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.buttons = this.countryDropdown.locator("button");
        this.userName = this.page.locator(".user__name [type='text']");
        this.submit = this.page.locator(".action__submit");
        this.orderSuccessMessage = this.page.locator(".hero-primary");
        this.orderId = this.page.locator(".em-spacer-1 .ng-star-inserted");
        //this.orders = this.page.locator("button[routerlink='/dashboard/myorders']");

    }
    async itemAvailableInCart(item) {
        await this.cart.click();
        await this.orderTiles.first().waitFor();
        const itemCheckout = "h3:has-text('" + item + "')"
        const bool = await this.page.locator(itemCheckout).isVisible();
        await console.log(bool);
        expect(bool).toBeTruthy();
    }
    async checkoutProcess(shortLetters, country) {
        await this.checkout.click();
        await this.country.pressSequentially(shortLetters);
        //const dropdown = page.locator(".ta-results");
        await this.countryDropdown.waitFor();
        const optionsCount = await this.buttons.count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.buttons.nth(i).textContent();
            if (text.includes(country)) {
                await this.buttons.nth(i).click();
                break;
            }
        }
        
    }

    async validateEmailonCheckout(emailId)
    {
        await expect(this.userName.first()).toHaveText(emailId);
        await this.submit.click();
        await expect(this.orderSuccessMessage).toHaveText(" Thankyou for the order. ");
        const orderId = await this.orderId.textContent();
        console.log(orderId);
    }
}