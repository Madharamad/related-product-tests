import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoValidProduct() {
    await this.page.goto('https://www.ebay.com/itm/1234567890'); // Replace with real product
  }

  async getRelatedProductCount(): Promise<number> {
    await this.page.waitForSelector('#related-best-sellers'); // adjust selector
    return await this.page.locator('#related-best-sellers .product-card').count();
  }

  async clickOnFirstRelatedProduct(): Promise<string> {
    await this.page.waitForSelector('#related-best-sellers .product-card a');
    await this.page.locator('#related-best-sellers .product-card a').first().click();
    await this.page.waitForLoadState('networkidle');
    return this.page.url();
  }
}
