import { isShotDateUpdated } from "./checkWebsiteContent.js";
import { sendEmail } from "./sendEmail.js";
import { WEBSITE_URL } from "./constants.js";

const dateWasUpdated = await isShotDateUpdated();

if (dateWasUpdated) {
  const subject = "Натальная карта!";
  const text = `Дата съемки обновилась.\nНадо покупать билеты.\n${WEBSITE_URL}`;

  sendEmail(subject, text);
} else {
  console.log("Обновлений нет");
}
