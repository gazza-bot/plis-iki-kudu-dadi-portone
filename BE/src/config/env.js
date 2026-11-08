const dotenv = require("dotenv")

dotenv.config()

const requiredEnvVars = [
    "GEMINI_API_KEY",
    "GEMINI_MODEL",
    "RESEND_API_KEY",
    "CONTACT_FROM_EMAIL",
    "CONTACT_TO_EMAIL",
    "CORS_ORIGIN"
];

const missing = requiredEnvVars.filter((envKey) => !process.env[envKey])

if (missing.length > 0) {
    throw new Error(`CRITICAL ERROR : ENV BELUM DI SETTING ${missing.join(", ")}`)
}

const env = {
    port : process.env.PORT || 5000,
    geminiApiKey : process.env.GEMINI_API_KEY,
    geminiModel : process.env.GEMINI_MODEL,
    corsOrigin : process.env.CORS_ORIGIN.trim(),
    resendApiKey : process.env.RESEND_API_KEY,
    contactFromEmail : process.env.CONTACT_FROM_EMAIL,
    contactToEmail : process.env.CONTACT_TO_EMAIL,
    chatRateLimit : {
        windowMs : 15 * 60 * 1000,
        max : 15
    },
    globalRateLimit : {
        windowMs : 60 * 1000,
        max : 100
    },
    contactRateLimit : {
        windowMs : 24 * 3600 * 1000,
        max : 1
    }
}

module.exports = env