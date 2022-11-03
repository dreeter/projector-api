const { DATE } = require("sequelize");
const db = require("../models/index");
const userModel = db.user;
const Op = db.Sequelize.Op;

exports.findOne = async (req, res) => {

    res.status(200).send("User Content.");

};