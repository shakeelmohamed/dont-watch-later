const puppeteer = require('puppeteer');
const path = require('path');

describe('Don\'t Watch Later Extension', () => {
  let browser;
  let page;

  // Load extension before all tests
  beforeAll(async () => {
    const extensionPath = path.resolve(__dirname, '..');
    
    browser = await puppeteer.launch({
      headless: 'new', // Extensions require non-headless mode
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
  });

  // Helper function to extract query parameters
  const getQueryParams = (url) => {
    const urlObj = new URL(url);
    return Object.fromEntries(urlObj.searchParams.entries());
  };

  // Test case 1: Uppercase WL
  test('should redirect and remove list parameter for list=WL (uppercase)', async () => {
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&index=1&list=WL';
    
    await page.goto(testUrl, { waitUntil: 'networkidle2' });
    
    const finalUrl = page.url();
    const params = getQueryParams(finalUrl);
    
    expect(params.list).toBeUndefined();
    expect(params.v).toBe('dQw4w9WgXcQ');
  });

  // Test case 2: Lowercase wl
  test('should redirect and remove list parameter for list=wl (lowercase)', async () => {
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&index=2&list=wl';
    
    await page.goto(testUrl, { waitUntil: 'networkidle2' });
    
    const finalUrl = page.url();
    const params = getQueryParams(finalUrl);
    
    expect(params.list).toBeUndefined();
    expect(params.v).toBe('dQw4w9WgXcQ');
  });

  // Test case 3: Mixed case Wl
  test('should redirect and remove list parameter for list=Wl (mixed case)', async () => {
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&index=3&list=Wl';
    
    await page.goto(testUrl, { waitUntil: 'networkidle2' });
    
    const finalUrl = page.url();
    const params = getQueryParams(finalUrl);
    
    expect(params.list).toBeUndefined();
    expect(params.v).toBe('dQw4w9WgXcQ');
  });

  // Test case 4: Mixed case wL
  test('should redirect and remove list parameter for list=wL (mixed case)', async () => {
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&index=4&list=wL';
    
    await page.goto(testUrl, { waitUntil: 'networkidle2' });
    
    const finalUrl = page.url();
    const params = getQueryParams(finalUrl);
    
    expect(params.list).toBeUndefined();
    expect(params.v).toBe('dQw4w9WgXcQ');
  });

  // Test case 5: Control - URL without Watch Later list parameter should not be modified
  test('should NOT redirect URLs without Watch Later list parameter', async () => {
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    
    await page.goto(testUrl, { waitUntil: 'networkidle2' });
    
    const finalUrl = page.url();
    const params = getQueryParams(finalUrl);
    
    expect(params.v).toBe('dQw4w9WgXcQ');
    expect(finalUrl).toContain('watch?v=dQw4w9WgXcQ');
  });

  // Test case 6: Control - URL with different list parameter should not be modified
  test('should NOT redirect URLs with non-WL list parameter', async () => {
    const testUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf';
    
    await page.goto(testUrl, { waitUntil: 'networkidle2' });
    
    const finalUrl = page.url();
    const params = getQueryParams(finalUrl);
    
    expect(params.v).toBe('dQw4w9WgXcQ');
    expect(params.list).toBeDefined();
    expect(params.list).not.toMatch(/^(wl|WL|Wl|wL)$/i);
  });
});
