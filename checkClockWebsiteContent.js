import { TIME_WEBSITE_URL, BORDER_TIME } from "./constants.js";
import axios from "axios";
import * as cheerio from "cheerio";

export async function isTimeUpdated() {
  try {
    console.log("TIME_WEBSITE_URL", TIME_WEBSITE_URL);

    const { data } = await axios.get(TIME_WEBSITE_URL);
    const time = getClockElementText(data);

    return isClockTimeMoreThanBorderTime(time);
  } catch (error) {
    console.error("Ошибка при проверке сайта:", error);
  }
}

function getClockElementText(siteData) {
  const $ = cheerio.load(siteData);
  const selector = "#clock";
  const element = $(selector).text();

  return element;
}

function isClockTimeMoreThanBorderTime(time) {
  const [hours, minutes, seconds] = parseTime(time);
  const [borderHours, borderMinutes, borderSeconds] = parseTime(BORDER_TIME);

  const clockDate = new Date();
  const borderDate = new Date();

  clockDate.setHours(hours, minutes, seconds);
  borderDate.setHours(borderHours, borderMinutes, borderSeconds);

  return clockDate > borderDate;
}

function parseTime(time) {
  return time.split(":").map((el) => Number(el));
}
