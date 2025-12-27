import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import handlers from "./handlers/index.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

import {
  PORT,
  NODE_ENV,
  BODY_PARSER_LIMIT,
  COOKIE_SECRET,
} from "./constants/env.js";
import { corsOptions } from "./constants/cors.js";
import {
  rateLimitOptions,
  authRateLimitOptions,
} from "./constants/rate-limit.js";

dotenv.config();

const app = express();

// Trust proxy (important for rate-limit behind proxies)
app.set("trust proxy", 1);
app.disable("x-powered-by");

//  Security Headers
app.use(
  helmet({
    contentSecurityPolicy: NODE_ENV === "production" ? undefined : false,
  })
);

// CORS
app.use(cors(corsOptions));

// Rate Limiting
app.use(rateLimit(rateLimitOptions));
app.use("/api/auth", rateLimit(authRateLimitOptions));

// Body Parser
app.use(express.json({ limit: BODY_PARSER_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: BODY_PARSER_LIMIT }));

// Cookies
app.use(cookieParser(COOKIE_SECRET));

//Compression
app.use(compression());

//  Routes
app.use("/api", handlers);

//  Error Handler
app.use(errorMiddleware);

//  Start Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`POS API running on port ${PORT}`);
    });
  } catch (error) {
    console.error(" Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
