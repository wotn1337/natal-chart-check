import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { WEBSITE_URL, WEEK_DAY_COLOR, WEEKEND_dAY_COLOR } from "./constants.js";
import mjml2html from "mjml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const emailContentPath = path.resolve(
  __dirname,
  "natal-chart-email-content.mjml"
);
const templateMjmlContent = fs.readFileSync(emailContentPath, "utf-8");

export function getNatalChartNotifyEmailContent({
  date,
  weekDay,
  img,
  guests,
}) {
  const variables = {
    WEBSITE_URL,
    DATE: date,
    WEEK_DAY: weekDay,
    IMG: img,
    GUESTS: getGuestsMjml(guests),
    WEEKDAY_COLOR: getDayBackgroundColor(weekDay),
  };
  const emailMjmlContent = insertVariablesInMjml(
    templateMjmlContent,
    variables
  );

  const { html } = mjml2html(emailMjmlContent);
  return html;
}

function getGuestsMjml(guests) {
  const guestItemPath = path.resolve(__dirname, "guest-item.mjml");
  const templateMjmlGuestItem = fs.readFileSync(guestItemPath, "utf-8");
  const guestsMjml = guests
    .map(({ href, name, time }) => {
      const variables = {
        TICKETS_HREF: href,
        NAME: name,
        TIME: time,
      };
      const guestContent = insertVariablesInMjml(
        templateMjmlGuestItem,
        variables
      );

      return guestContent;
    })
    .join("");

  return guestsMjml;
}

function insertVariablesInMjml(mjml, variables) {
  let result = mjml;
  Object.entries(variables).forEach(([key, value]) => {
    result = result.replace(`{{${key}}}`, value);
  });
  return result;
}

function getDayBackgroundColor(day) {
  if (isWeekend(day)) {
    return WEEKEND_dAY_COLOR;
  }

  return WEEK_DAY_COLOR;
}

function isWeekend(day) {
  return day === "сб" || day === "вс";
}
