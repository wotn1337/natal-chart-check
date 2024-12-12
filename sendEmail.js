import { EMAIL_CONFIG, EMAIL_RECIPIENTS } from "./constants.js";
import nodemailer from "nodemailer";

export async function sendEmail(subject, html, from = "Notify") {
  const transporter = nodemailer.createTransport(EMAIL_CONFIG);

  await transporter.sendMail({
    from: `"${from}" ${EMAIL_CONFIG.auth.user}`,
    to: EMAIL_RECIPIENTS,
    subject,
    html,
  });

  console.log("Уведомление отправлено");
}
