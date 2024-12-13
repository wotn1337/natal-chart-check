import axios from "axios";
import * as cheerio from "cheerio";
import { sendEmail } from "./sendEmail.js";

const LOOKING_FOR_CITY = "Екатеринбург";
const BUY_TICKETS = "Купить билет";
const { data } = await axios.get(
  "https://comedyconcert.ru/performer/zhenskiy-forum"
);
const $ = cheerio.load(data);
const cityItems = $(".performer__page__ticket_buy__content");

function getConcerts() {
  return cityItems
    .map((_, el) => {
      const city = getText(el, ".performer__page__ticket_buy__city-title");
      const place = getText(
        el,
        ".performer__page__ticket_buy__playground-title"
      );
      const date = getText(el, ".performer__page__ticket_buy__ticket-datetime");
      const ticketsLink = $(el)
        .find("a")
        .filter((_, el) => $(el).text().trim() === BUY_TICKETS)
        .attr("href");

      return { city, place, date, ticketsLink };
    })
    .get();
}

function getText(el, selector) {
  return $(el).find(selector).text().trim();
}

function getLookingForCityConcert(concerts) {
  return concerts.find(({ city }) => city === LOOKING_FOR_CITY);
}

function getHtml({ city, place, date, ticketsLink }) {
  return `
    <div>
      <h3>${city}</h3>
      <p>Дата нового концерта: <strong>${date}</strong></p>
      <p>Место: ${place}</p>
      <a href="${ticketsLink}">Купить билеты</a>
    </div>
  `;
}

const concerts = getConcerts();
const lookingForConcert = getLookingForCityConcert(concerts);
if (!!lookingForConcert) {
  const html = getHtml(lookingForConcert);
  sendEmail("Женский форум", html);
}
