import "dotenv/config";

export const WEBSITE_URL = "https://mediumquality.ru/natalnayakarta";
export const SHOT_DATE_TITLE = "СЪЁМКИ НОВЫХ ВЫПУСКОВ";
export const OLD_DATE_STRING = "19 НОЯБРЯ";

export const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
export const EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT;
