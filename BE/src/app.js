const express = require("express");
const cors = require("cors");
const env = require("./config/env");
const apiRoutes = require("./routes/index");
const { globalLimiter } = require("./middlewares/rateLimiter");

const app = express();

app.set("trust proxy", 1);

app.use(cors({
    origin: env.corsOrigin
}));

app.use(express.json())

app.use("/api", globalLimiter, apiRoutes)

// Global error handler (Express 5 requires 4-argument signature)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

module.exports = app