import puppeteer from "puppeteer";

const url =
  "https://www.lamoda.ru/p/vi055lwtxp96/beauty_accs-vichy-syvorotka-dlya-volos/";

export default async function getLamodaPrice() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    const priceElement = await page.$('[aria-label="Итоговая цена"]');

    if (priceElement) {
      const priceText = await page.evaluate(
        (el) => el.textContent?.trim().replace(" ", "").replace("₽", ""),
        priceElement
      );

      return Number(priceText);
    } else {
      console.log("Не удалось получить цену с Lamoda");
    }
  } catch (error) {
    console.error("Ошибка при парсинге:", error);
  } finally {
    await browser.close();
  }
}
