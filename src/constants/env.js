import dotenv from "dotenv";
dotenv.config();

//app
export const APPLICATION_NAME = process.env.APPLICATION_NAME || "POS-MERN";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = Number(process.env.PORT) || 5000;
export const ORIGIN = process.env.ORIGIN || "*";

//security
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";
export const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
export const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 10;
//database (mongo)
export const MONGO_URI = process.env.MONGO_URI;

//request limits
export const BODY_PARSER_LIMIT = process.env.BODY_PARSER_LIMIT || "10mb";

//rate limit
export const RATE_LIMIT_WINDOW_MS =
  Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;

export const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX) || 100;

export const AUTH_RATE_LIMIT_MAX =
  Number(process.env.AUTH_RATE_LIMIT_MAX) || 20;
