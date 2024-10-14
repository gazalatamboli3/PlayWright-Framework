class LoginPage
{
    constructor(page)
    {
this.page = page;
this.userName = page.locator("//input[@id='userEmail']");
this.password = page.locator("//input[@id='userPassword']");
this.login  = page.locator("//*[@id='login']");
    }

    async validLogin(userEmail, password)
{
await this.userName.fill(userEmail)
await this.password.fill(password)
await this.login.click();
await this.page.waitForLoadState('networkidle');
}

async landingOn(url)
{
    await this.page.goto(url);
}
}
module.exports = {LoginPage};




