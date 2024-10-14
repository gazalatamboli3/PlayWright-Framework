export class DashBoardPage
{
    constructor (page)
    {
        this.page = page;
        this.products =  this.page.locator('.card-body');
        this.productsName = this.page.locator('.card-body b');
        

    }
    async verifyProducts()
    {
        let count = await this.products.count();
        console.log('Total products are '+count)
        let titles = await this.productsName.allTextContents();
        console.log(titles);
    }
    async addProductToCart(item)
    {
    const count = await this.products.count();
    for(let i=0; i<count; i++)
        {
            if(await this.products.nth(i).locator('b').textContent()=== item)
            {
                //await page.pause();
                //await products.nth(i).locator('text=Add To Cart').waitFor()
                await this.products.nth(i).locator('text=Add To Cart').click();
                break;
            }
        }
    }
}