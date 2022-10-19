const express = require('express');
const router = express.Router();

const workItem = require("../controllers/work-item.controller");

router.get("/:id", workItem.findOne);

router.post("/", workItem.create);

router.delete("/:id", workItem.delete);

router.put("/:id", workItem.update);

router.get("/children", workItem.findAllChildren);

module.exports = router;