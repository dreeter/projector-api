const express = require('express');
const router = express.Router();

const project = require("../controllers/project.controller");

router.get("/:id", project.findOne);

router.post("/", project.create);

router.delete("/:id", project.delete);

//TODO: router.put

module.exports = router;