import session from "express-session";
import dotenv from "dotenv";

dotenv.config();

// Session configuration
export const sessionConfig = {
  secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    httpOnly: true, // Prevents JavaScript access to the cookie
    sameSite: "lax", // CSRF protection
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  name: "sessionId", // Custom session cookie name
};

// Create session middleware
export const sessionMiddleware = session(sessionConfig);
