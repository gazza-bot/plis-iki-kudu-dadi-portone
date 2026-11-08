const { rateLimit } = require("express-rate-limit");
const env = require("../config/env");

const limitMessage = {
  chatMessage : "Waduh, Nimo lagi males nihhh. Balik lagi nanti yak ><",
  globalMessage : "Error : Too Many Request",
  contactMessage : "Kamu hanya bisa mengirim pesan 1X dalam sehari."
}

const chatLimiter = rateLimit({
  windowMs: env.chatRateLimit.windowMs,
  max: env.chatRateLimit.max,
  message: { error: limitMessage.chatMessage },
  standardHeaders: true,
  legacyHeaders: false,
});

const globalLimiter = rateLimit({
  windowMs: env.globalRateLimit.windowMs,
  max: env.globalRateLimit.max,
  message: { error: limitMessage.globalMessage },
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
    windowMs: env.contactRateLimit.windowMs,
    max : env.contactRateLimit.max,
    message : { error : limitMessage.contactMessage },
    standardHeaders :  true,
    legacyHeaders : false
})

module.exports = { chatLimiter, globalLimiter, contactLimiter };