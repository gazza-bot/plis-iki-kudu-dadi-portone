const { rateLimit } = require("express-rate-limit");
const env = require("../config/env");

const chatLimiter = rateLimit({
  windowMs: env.chatRateLimit.windowMs,
  max: env.chatRateLimit.max,
  message: { error: "Waduh, Nimo lagi males nihhh. Balik lagi nanti yak ><" },
  standardHeaders: true,
  legacyHeaders: false,
});

const globalLimiter = rateLimit({
  windowMs: env.globalRateLimit.windowMs,
  max: env.globalRateLimit.max,
  message: { error: "Error : Too Many Requests" },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { chatLimiter, globalLimiter };