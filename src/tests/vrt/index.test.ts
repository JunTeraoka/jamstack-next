import { DEVICES, GOTO_OPTIONS } from "tests/vrt/config";

// テスト対象のURL
const URL = "http://localhost:3000/";

// PC
it("vrt-top-pc", async () => {
  const page = await browser.newPage();
  await page.goto(URL, GOTO_OPTIONS);
  const image = await page.screenshot({
    fullPage: true,
  });
  expect(image).toMatchImageSnapshot();
});

// iPhone
it("vrt-top-sp", async () => {
  const page = await browser.newPage();
  await page.emulate(DEVICES.iPhone);
  await page.goto(URL, GOTO_OPTIONS);
  const image = await page.screenshot({
    fullPage: true,
  });
  expect(image).toMatchImageSnapshot();
});

// iPad
it("vrt-top-tb", async () => {
  const page = await browser.newPage();
  await page.emulate(DEVICES.iPad);
  await page.goto(URL, GOTO_OPTIONS);
  const image = await page.screenshot({
    fullPage: true,
  });
  expect(image).toMatchImageSnapshot();
});
