import puppeteer from 'https://deno.land/x/puppeteer@9.0.2/mod.ts';
import {
  assertEquals,
  fail,
} from "https://deno.land/std@0.130.0/testing/asserts.ts";

Deno.test('Should render home page of react-18 example app', async () => {
    const expected = 'Hello world'
    const selector = 'article h1'
    const browser = await puppeteer.launch({
        executablePath: Deno.env.get('chrome_path'),
        headless: true,
      }
    );
    const page = await browser.newPage()
    await page.setViewport({ width: 979, height: 865 })
    await page.goto('http://localhost:8000/')

    try {

      const header = await page.waitForSelector(selector)
      if (header) {
        const text = await page.evaluate(element => element.textContent, header);
        assertEquals(text, expected);
      } else {
        fail(`ERROR: Selector ${selector} not found`)
      }
    } catch (e) {
      fail(`ERROR: ${e}`);
    }
    finally {
      await browser.close();
    }
});