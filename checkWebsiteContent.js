import axios from "axios";
import * as cheerio from "cheerio";
import moment from "moment";
import { OLD_DATE_STRING, SHOT_DATE_TITLE, WEBSITE_URL } from "./constants.js";

const { data } = await axios.get(WEBSITE_URL);
const $ = cheerio.load(data);

export function isShotDateUpdated() {
  try {
    const date = getShotDateElementText();
    const weekDay = getDateWeekDay(date);
    const img = getImageUrl();
    const guests = getGuestItems();
    const isNewDate = date && date !== OLD_DATE_STRING;

    if (isNewDate) {
      return { date, weekDay, img, guests };
    }

    return false;
  } catch (error) {
    console.error("Ошибка при проверке сайта:", error);
  }
}

function getShotDateElementText() {
  const text = $("strong")
    .filter((_, el) => $(el).text().trim() === SHOT_DATE_TITLE) // Заголовок
    .next() // <br/>
    .next() // Дата
    .text();

  return text;
}

function getDateWeekDay(date) {
  moment.locale("ru");
  const momentDate = moment(date, "DD MMMMM");
  return momentDate.format("dd");
}

function getImageUrl() {
  const url = $('meta[itemprop="image"]') // meta
    .eq(1)
    .attr("content");

  return url;
}

function getGuestItems() {
  const guests = $('a[data-buttonfieldset="li_button"]')
    .map((_, el) => getGuestItem($(el)))
    .get();

  return guests;
}

function getGuestItem(el) {
  return {
    href: el.attr("href"),
    time: el.find(".t993__btn-text-title").text().split(" ")[0].trim(),
    name: el.find(".t993__btn-text-descr").text().replace("гость ", "").trim(),
  };
}
