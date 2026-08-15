const express = require("express");
const router = express.Router();
const { chatLimiter } = require("../middlewares/rateLimiter")
const { postChat } = require("../controllers/chat.controllers");

router.post("/", chatLimiter , postChat);

module.exports = router;