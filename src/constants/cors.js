import { ORIGIN } from "./env.js";

export const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (ORIGIN == origin) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
