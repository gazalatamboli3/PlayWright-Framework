const {test} = require ('@playwright/test')

test('Security test request intercept', async ({page})=>

{

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("//input[@id='userEmail']").fill("gntamboli786@gmail.com")
    await page.locator("//input[@id='userPassword']").fill("Learning!1")
    await page.locator("//*[@id='login']").click();
    await page.waitForLoadState('networkidle');
    const products = await page.locator('.card-body');
    await page.locator("button[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("//button[contains(text(),'View')]").first().click();
    //await page.pause();
    })