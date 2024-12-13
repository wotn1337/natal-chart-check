import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

export const WEBSITE_URL = process.env.WEBSITE_URL;
export const SHOT_DATE_TITLE = "СЪЁМКИ НОВЫХ ВЫПУСКОВ";
export const OLD_DATE_STRING = process.env.OLD_DATE_STRING;

export const EMAIL_CONFIG = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};
export const EMAIL_RECIPIENTS = process.env.EMAIL_RECIPIENTS;

export const WEEK_DAY_COLOR = "black";
export const WEEKEND_dAY_COLOR = "red";
