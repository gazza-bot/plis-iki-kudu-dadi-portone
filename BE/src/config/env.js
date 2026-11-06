const dotenv = require("dotenv")

dotenv.config()

const requiredEnvVars = ["GEMINI_API_KEY", "GEMINI_MODEL", "WEB3FORMS_ACCESS_KEY"];

const missing = requiredEnvVars.filter((envKey) => !process.env[envKey])

if (missing.length > 0) {
    throw new Error(`CRITICAL ERROR : ENV BELUM DI SETTING ${missing.join(", ")}`)
}

const env = {
    port : process.env.PORT || 5000,
    geminiApiKey : process.env.GEMINI_API_KEY,
    geminiModel : process.env.GEMINI_MODEL,
    corsOrigin : process.env.CORS_ORIGIN || "*",
    web3formsKey : process.env.WEB3FORMS_ACCESS_KEY,
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