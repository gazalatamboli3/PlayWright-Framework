const {test, expect, request}= require ('@playwright/test');
let webContext;
test.beforeAll(async ({browser})=>{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("//input[@id='userEmail']").fill("gntamboli786@gmail.com")
    await page.locator("//input[@id='userPassword']").fill("Learning!1")
    await page.locator("//*[@id='login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path : 'state.json'});
    webContext=await browser.newContext({storageState : 'state.json'});




})

test('Add to Cart with cookies', async () => {

    // page.addInitScript(value=>{window.localStorage.setItem(token,value)},token);
 
     const item = 'ZARA COAT 3';
     const page = await webContext.newPage();    
     await page.goto("https://rahulshettyacademy.com/client"); 
     const products = await page.locator('.card-body')
     const count = await products.count()
     console.log('Total products are '+count)
     console.log(await products.nth(1).locator('b').textContent())
     //await page.pause();
 
     for(let i=0; i<count; i++)
     {
         if(await products.nth(i).locator('b').textContent()=== item)
         {
             //await page.pause();
             //await products.nth(i).locator('text=Add To Cart').waitFor()
             await products.nth(i).locator('text=Add To Cart').click();
             break;
         }
     }
     //await page.pause()y
 
     await page.locator("[routerlink*='cart']").click()
     await page.locator('div li').first().waitFor()
     const itemCheckout = "h3:has-text('"+ item + "')"
     const bool = await page.locator(itemCheckout).isVisible()
     await console.log(bool)
     expect(bool).toBeTruthy()
 
     await page.locator("text=Checkout").click();
  
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
  
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " India") {
          await dropdown.locator("button").nth(i).click();
          break;
       }
    }
   const email = 'gntamboli786@gmail.com';
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    const newOrderId= await orderId.split(" ");
    console.log(newOrderId[2]);
 
    await page.locator("button[routerlink='/dashboard/myorders']").click();
    const orderIdrow= await page.locator('th[scope=row]')
    await orderIdrow.first().waitFor();
 
    const orderCount = await orderIdrow.count();
    console.log(orderCount)
    //await page.pause();
    for(let i=0; i<count; i++)
    {
     console.log(await orderIdrow.nth(i).textContent())
     if(await orderIdrow.nth(i).textContent()===newOrderId[2])
     {
         console.log('Order ID is successfully displayed in Orderslist');
         break;
     }
    }
 
  
 
 });
    