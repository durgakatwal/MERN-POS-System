import {
  AUTH_RATE_LIMIT_MAX,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from "./env.js";

export const rateLimitOptions = {
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX,
  message: {
    status: "error",
    message: "Too many requests from this IP, please try again after an hour",
  },
  standardHeaders: true,
  legacyHeaders: false,
};
export const authRateLimitOptions = {
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: AUTH_RATE_LIMIT_MAX,
  message: {
    status: "error",
    message: "Too many requests from this IP, please try again after an hour",
  },
};
