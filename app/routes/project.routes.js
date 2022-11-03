const express = require('express');
const router = express.Router();

const project = require("../controllers/project.controller");
const authJwt = require("../middleware/authJwt.middleware");

router.get("/:id", project.findOne);

router.post("/", project.create);

router.put("/:id", project.update);

router.delete("/:id", authJwt.isAdmin, project.delete);

router.get("/", project.findAll);

module.exports = router;