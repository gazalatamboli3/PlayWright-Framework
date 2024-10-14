const { test, expect,request } = require("@playwright/test")
const {APIUtils} = require('../utils/APIUtils');

const loginPayload = {userEmail: "gntamboli786@gmail.com", userPassword: "Learning!1"};
const orderPayload = {orders:[{country: "Cuba", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};
let token;
let response;

test.beforeAll( async()=>
{
const apicontext = await request.newContext();
const apiutils= new APIUtils(apicontext,loginPayload);
response = await apiutils.createOrder(orderPayload);
}

)

test('Browser Context PlayWright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.linkedin.com/in/gazala-tamboli-9525549b/");
    console.log(await page.title)

});

test('Without Browser Context PlayWright test', async ({ page }) => {
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://www.google.com/");
    console.log(await page.title)
    await expect(page).toHaveTitle("Google")
});

test('Login to Website', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("//input[@id='userEmail']").fill("gntamboli786@gmail.com")
    await page.locator("//input[@id='userPassword']").fill("Learning!1")
    await page.locator("//*[@id='login']").click();
    await page.waitForLoadState('networkidle');
    console.log(await page.locator('.card-body b').allTextContents())
});

test('Select radio button and dropdown', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    await page.locator("#username").fill("rahulshettyacademy")
    await page.locator("#password").fill("learning")
    await page.locator('#usertype').last().click()
    await page.locator('#okayBtn').click()
    await page.locator('#terms').click()
    await page.locator('select.form-control').selectOption('consult')
    await page.locator('#signInBtn').click();
    console.log(await page.locator('select.form-control').textContent())

});

test('Child Window tutorial', async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    const isBlinking = await page.locator("//*[contains(text(),'Free Access')]")


    const [childPage] = await Promise.all(
        [context.waitForEvent('page'),
        isBlinking.click()]
    )

    const email = await childPage.locator('//strong/a').textContent()
    console.log(email)

});

test('Add to Cart', async ({ page }) => {

   // page.addInitScript(value=>{window.localStorage.setItem(token,value)},token);

    const item = 'ZARA COAT 3';
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("//input[@id='userEmail']").fill("gntamboli786@gmail.com")
    await page.locator("//input[@id='userPassword']").fill("Learning!1")
    await page.locator("//*[@id='login']").click();
    await page.waitForLoadState('networkidle');
    
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

test("Calendar validations",async({page})=>
    {
     
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber,date,year];
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.getByText(year).click();
        await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
        await page.locator("//abbr[text()='"+date+"']").click();
        const inputs = await page.locator(".react-date-picker__inputGroup input");
        for (let index = 0; index <inputs.length; index++)
        {
            const value =inputs[index].getAttribute("value");
            expect(value).toEqual(expectedList[index]);
        }
    })

test.only('place an order with API', async ({ page }) => {

        await page.addInitScript(value=>{window.localStorage.setItem('token',value)},response.token);
     
        
        await page.goto("https://rahulshettyacademy.com/client/");
              
     
        await page.locator("button[routerlink='/dashboard/myorders']").click();
        const orderIdrow= await page.locator('th[scope=row]')
        await orderIdrow.first().waitFor();
     
        const orderCount = await orderIdrow.count();
        console.log(orderCount)
        //await page.pause();
        for(let i=0; i<orderCount; i++)
        {
         const myOrderId= await orderIdrow.nth(i).textContent()
         if(myOrderId.includes(response.orderId))
         {
             console.log('Order ID is successfully displayed in Orderslist');
             break;
         }
        }
     
      
     
     });