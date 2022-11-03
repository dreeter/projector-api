const { authJwt } = require("../middleware/index");
const user = require("../controllers/user.controller");
const express = require('express');
const router = express.Router();

//get route for a user, uses the middleware to verify they have a valid token before finding that user
router.get("/", user.findOne);

// router.post("/", user.create);

// router.delete("/:id", user.delete);

// router.put("/:id", user.update);

module.exports = router;