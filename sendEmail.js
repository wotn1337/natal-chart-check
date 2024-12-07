import { EMAIL_CONFIG, EMAIL_RECIPIENTS } from "./constants.js";
import nodemailer from "nodemailer";

export async function sendEmail(subject, text) {
  const transporter = nodemailer.createTransport(EMAIL_CONFIG);

  await transporter.sendMail({
    from: `"НАТАЛЬНАЯ КАРТА" ${EMAIL_CONFIG.auth.user}`,
    to: EMAIL_RECIPIENTS,
    subject,
    text,
  });

  console.log("Уведомление отправлено");
}
