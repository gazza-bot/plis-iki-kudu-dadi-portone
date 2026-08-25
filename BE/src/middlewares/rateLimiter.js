const { rateLimit } = require("express-rate-limit");
const env = require("../config/env");

const limitMessage = {
  chatMessage : "Waduh, Nimo lagi males nihhh. Balik lagi nanti yak ><",
  globalMessage : "Error : Too Many Request",
  emailMessage : "Kamu hanya bisa mengirim email 1X dalam Sehari"
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

const sendEmailLimiter = rateLimit({
    windowMs: env.sendEmailLimit.windowMs,
    max : env.sendEmailLimit.max,
    message : {error : limitMessage.emailMessage},
    standardHeaders :  true,
    legacyHeaders : false
})

module.exports = { chatLimiter, globalLimiter, sendEmailLimiter };