import { EMAIL_CONFIG, EMAIL_RECIPIENT } from "./constants.js";
import nodemailer from "nodemailer";

export async function sendEmail(subject, text) {
  const transporter = nodemailer.createTransport(EMAIL_CONFIG);

  await transporter.sendMail({
    from: `"Notifier" ${EMAIL_CONFIG.auth.user}`,
    to: EMAIL_RECIPIENT,
    subject,
    text,
  });

  console.log("Уведомление отправлено");
}
