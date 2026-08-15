const express = require("express");
const router = express.Router();
const chatRoutes = require("./chat.routes")
const projectsRoutes = require("./projects.routes")

router.use("/chat", chatRoutes);
router.use("/projects", projectsRoutes);

module.exports = router