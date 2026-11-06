const express = require("express");
const router = express.Router();
const { contactLimiter } = require("../middlewares/rateLimiter");
const { postContact } = require("../controllers/contact.controllers");

router.post("/", contactLimiter, postContact);

module.exports = router;
