import { isShotDateUpdated } from "./checkWebsiteContent.js";
import { sendEmail } from "./sendEmail.js";
import { getNatalChartNotifyEmailContent } from "./natalChartNotifyEmail.js";

const siteParsedData = isShotDateUpdated();

if (!!siteParsedData) {
  const subject = "Натальная карта!";
  const html = getNatalChartNotifyEmailContent(siteParsedData);

  sendEmail(subject, html, "НАТАЛЬНАЯ КАРТА");
} else {
  console.log("Обновлений нет");
}
