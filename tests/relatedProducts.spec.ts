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

  test('TC03 - Related product count matches expected backend count', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.gotoValidProduct();
    const uiCount = await productPage.getRelatedProductCount();

    // For demo: Expected count hardcoded, ideally fetched from API or fixture
    const expectedCount = 5;

    expect(uiCount).toBe(expectedCount);
  });

  test('TC04 - Each related product shows image, name, and price', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.gotoValidProduct();
    const products = await productPage.getRelatedProducts();

    for (const product of products) {
      expect(await product.isImageVisible()).toBeTruthy();
      expect(await product.getName()).not.toBe('');
      expect(await product.getPrice()).not.toBe('');
    }
  });

  test('TC05 - Related products do not include the current product', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.gotoValidProduct();
    const currentProductId = await productPage.getCurrentProductId();
    const relatedProductIds = await productPage.getRelatedProductIds();

    expect(relatedProductIds).not.toContain(currentProductId);
  });

});

