const express = require("express");
const router = express.Router();
const chatRoutes = require("./chat.routes")
const projectsRoutes = require("./projects.routes")
const contactRoutes = require("./contact.routes")

router.use("/chat", chatRoutes);
router.use("/projects", projectsRoutes);
router.use("/contact", contactRoutes);

module.exports = router