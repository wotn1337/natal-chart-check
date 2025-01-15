import axios from "axios";
import * as cheerio from "cheerio";

export default async function getPrice() {
  const { data } = await axios.get(
    "https://goldapple.ru/89310800015-dercos-aminexil-intensive-5",
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
  const $ = cheerio.load(data);

  const item = $('div[itemprop="priceSpecification"]');
  const priceText = item.first().text().split("₽")[0].trim().replace(" ", "");

  return Number(priceText);
}

console.log(await getPrice());
