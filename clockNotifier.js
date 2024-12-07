import { isTimeUpdated } from "./checkClockWebsiteContent.js";
import { sendEmail } from "./sendEmail.js";

const timeWasUpdated = await isTimeUpdated();

if (timeWasUpdated) {
  const subject = "Время изменилось!";
  const text = "Кажется, скрипт работает";

  sendEmail(subject, text);
} else {
  console.log("Обновлений нет");
}
