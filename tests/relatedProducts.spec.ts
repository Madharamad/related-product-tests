import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';

test.describe('Related Best Seller Products Section', () => {

  test('TC01 - Section appears with 3 to 10 products', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.gotoValidProduct();
    const count = await productPage.getRelatedProductCount();
    expect(count).toBeGreaterThanOrEqual(3);
    expect(count).toBeLessThanOrEqual(10);
  });

  test('TC02 - Clicking a related product navigates correctly', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.gotoValidProduct();
    const productUrl = await productPage.clickOnFirstRelatedProduct();
    expect(productUrl).toContain('/itm/');
  });

});
