const { DATE } = require("sequelize");
const db = require("../models/index");
const userModel = db.user;
const Op = db.Sequelize.Op;

// exports.allAccess = (req, res) => {
//     res.status(200).send("Public Content.");
// };
  
// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };

// exports.findOne = async (req, res) => {

//     try { 
//         const task = await userModel.findByPk(req.params.id);

//         if(task){
//             res.send(task);
//         } else {
//             res.status(404).send({message: "No user with this id found"})
//         }
//     } catch (err) {
//         res.status(500).send({
//             message: err
//         })
//     }

// };

exports.findOne = async (req, res) => {

    res.status(200).send("User Content.");

};