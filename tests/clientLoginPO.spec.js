const {test, expect, request}= require ('@playwright/test')
const {LoginPage}=require ('../pageObjects/LoginPage')

test('Cleint login via pageObject', async ({page})=>
{
    const loginPage = new LoginPage(page);
    const email = "gntamboli786@gmail.com";
    const password = "Learning!1";
    const url = "https://rahulshettyacademy.com/client";
    await loginPage.landingOn(url);
    await loginPage.validLogin(email, password);
}

)