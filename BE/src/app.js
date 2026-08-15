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

module.exports = app