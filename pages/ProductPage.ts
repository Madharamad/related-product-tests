import { Locator, Page } from '@playwright/test';

type RelatedProduct = {
  root: Locator;
  isImageVisible: () => Promise<boolean>;
  getName: () => Promise<string>;
  getPrice: () => Promise<string>;
  getProductId: () => Promise<string>;
};

export class ProductPage {
  readonly page: Page;
  readonly relatedProductsLocator: Locator;
  readonly currentProductLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.relatedProductsLocator = page.locator('.related-products .product-item'); // update selector
    this.currentProductLocator = page.locator('#product-id'); // update selector to get current product id element
  }

  async gotoValidProduct() {
    // Replace with your product page URL
    await this.page.goto('https://example.com/product-page-url');
  }

  async getRelatedProductCount(): Promise<number> {
    return await this.relatedProductsLocator.count();
  }

  async clickOnFirstRelatedProduct(): Promise<string> {
    const firstProductLink = this.relatedProductsLocator.first().locator('a');
    const href = await firstProductLink.getAttribute('href');
    await firstProductLink.click();
    await this.page.waitForLoadState('networkidle');
    return href || '';
  }

  async getRelatedProducts(): Promise<RelatedProduct[]> {
    const count = await this.relatedProductsLocator.count();
    const products: RelatedProduct[] = [];

    for (let i = 0; i < count; i++) {
      const productRoot = this.relatedProductsLocator.nth(i);
      products.push({
        root: productRoot,
        isImageVisible: async () => {
          const img = productRoot.locator('img');
          return await img.isVisible();
        },
        getName: async () => {
          return await productRoot.locator('.product-name').innerText();
        },
        getPrice: async () => {
          return await productRoot.locator('.product-price').innerText();
        },
        getProductId: async () => {
          // Assuming product id is stored as data attribute or inside a tag
          return await productRoot.getAttribute('data-product-id') || '';
        },
      });
    }
    return products;
  }

  async getCurrentProductId(): Promise<string> {
    // Assuming product id is stored in an element or as a data attribute
    return await this.currentProductLocator.getAttribute('data-product-id') || '';
  }

  async getRelatedProductIds(): Promise<string[]> {
    const products = await this.getRelatedProducts();
    const ids: string[] = [];
    for (const product of products) {
      const id = await product.getProductId();
      if (id) ids.push(id);
    }
    return ids;
  }
}

