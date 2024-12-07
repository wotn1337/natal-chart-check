import "dotenv/config";

export const WEBSITE_URL = process.env.WEBSITE_URL;
export const SHOT_DATE_TITLE = "СЪЁМКИ НОВЫХ ВЫПУСКОВ";
export const OLD_DATE_STRING = process.env.OLD_DATE_STRING;

export const BORDER_TIME = process.env.BORDER_TIME;
export const TIME_WEBSITE_URL = process.env.TIME_WEBSITE_URL;

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
