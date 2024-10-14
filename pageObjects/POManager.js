const {LoginPage} = require ('../pageObjects/LoginPage');
const {DashBoardPage} = require ('../pageObjects/DashboardPage');
const {CheckoutPage} = require ('../pageObjects/CheckoutPage');

export class POManager
{
    constructor (page)
    {
this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashBoardPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashBoardPage()
    {
        return this.dashboardPage;
    }
    getCheckoutPage()
    {
        return this.checkoutPage;
    }
}