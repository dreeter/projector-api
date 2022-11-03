const express = require('express');
const router = express.Router();

const task = require("../controllers/task.controller");
const authJwt = require("../middleware/authJwt.middleware");

//TODO, add authorization middleware
router.get("/:id", task.findOne);

router.post("/", task.create);

router.delete("/:id", authJwt.isAdmin, task.delete);

router.put("/:id", task.update);

router.get("/children/:id", task.findAllChildTasks);

module.exports = router;