const projects = require("../data/projects");

function getProjects(req, res) {
    res.json(projects)
}

module.exports = {getProjects}