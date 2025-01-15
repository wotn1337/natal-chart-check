import nodemailer from "nodemailer";
import { EMAIL_CONFIG, EMAIL_RECIPIENTS_PRICE_CHECKER } from "../constants.js";
import getGoldApplePrice from "./getGoldApplePrice.js";
import getLamodaPrice from "./getLamodaPrice.js";

const goldApplePrice = await getGoldApplePrice();
const lamodaPrice = await getLamodaPrice();

const transporter = nodemailer.createTransport(EMAIL_CONFIG);

await transporter.sendMail({
  from: `"Price-checker" ${EMAIL_CONFIG.auth.user}`,
  to: EMAIL_RECIPIENTS_PRICE_CHECKER,
  subject: "Проверка цен",
  html: `<div>
    <div>Золотое яблоко: ${goldApplePrice}₽</div>
    <div>Ламода: ${lamodaPrice}₽</div>
  </div>`,
});

console.log("Уведомление отправлено");
