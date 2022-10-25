const express = require('express');
const router = express.Router();

const project = require("../controllers/project.controller");

router.get("/:id", project.findOne);

router.post("/", project.create);

router.put("/:id", project.update);

router.delete("/:id", project.delete);

router.get("/", project.findAll);

module.exports = router;