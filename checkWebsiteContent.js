import { WEBSITE_URL, SHOT_DATE_TITLE, OLD_DATE_STRING } from "./constants.js";
import axios from "axios";
import * as cheerio from "cheerio";

export async function isShotDateUpdated() {
  try {
    const { data } = await axios.get(WEBSITE_URL);
    const date = getShotDateElementText(data);

    return date !== OLD_DATE_STRING;
  } catch (error) {
    console.error("Ошибка при проверке сайта:", error);
  }
}

function getShotDateElementText(siteData) {
  const $ = cheerio.load(siteData);
  const selector = "strong";
  const element = $(selector)
    .filter((_, el) => $(el).text().trim() === SHOT_DATE_TITLE) // Заголовок
    .next() // <br/>
    .next() // Дата
    .text();

  return element;
}
