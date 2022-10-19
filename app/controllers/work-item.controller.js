const { DATE } = require("sequelize");
const db = require("../models/index");
const workItem = db.workItem;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {

    if(!req.body.title) {
        res.status(400).send({
            message: "Title may not be empty!"
        })
        return;
    }

    const newWorkItem = {
        title: req.body.title,
        status: req.body.status,
        priority: req.body.status,
        description: req.body.description,
        due: req.body.due || null,
        completed: req.body.completed || null,
        parent_id: req.body.parent_id || null,
        owner_id: req.body.owner_id || null,
        creator_id: req.body.creator_id || null
    };

    try {
        const result = await workItem.create(newWorkItem);
        res.send(result);
    } catch (err) {
        res.status(500).send({
            message: err || "Some error occured creating this item"
        })
    }

};

exports.findOne = async (req, res) => {
  
    const id = req.params.id;

    try { 
        const result = await workItem.findByPk(id);
        if(result){
            res.send(result);
        } else {
            res.status(404).send({message: "No id found"})
        }
    } catch (err) {
        res.status(500).send({
            message: err || "Some error occured getting this item"
        })
    }

};

exports.update = async (req, res) => {
  
    //TODO: validate and pass actual attribute values
    let id = req.params.id;
    req.body.parent_id = 5;
    req.body.creator_id = 5;
    req.body.owner_id = 5;
    req.body.due = new Date(Date.now()).toISOString();
    req.body.completed = new Date(Date.now()).toISOString();
rs
    try{
        const result = await workItem.update(req.body, {where: {id: id}});
        if(result[0] === 1){
            res.send({message: "Item updated successful"});
        } else {
            res.send({message: "Item update unsuccessful"});
        }
    } catch(err){
        res.status(500).send({message: "Error updating item with id"});
    }

};

exports.delete = async (req, res) => {

    const id = req.params.id;

    try{
        const result = await workItem.destroy({where: {id: id}});
        if(result[0] === 1){
            res.send({message: "Item deleted successful"});
        } else {
            res.send({message: "Item delete unsuccessful"});
        }
    } catch(err){
        res.status(500).send({message: "Error deleteing item with id: " + id});
    }

};

exports.findAllChildren = async (req, res) => {
  
    const parent_id = req.params.id;

    try{
        const result = await workItem.findAll({where: { parent_id: parent_id }});
        if(result){
            res.send(result);
        } else {
            res.send({message: "Error finding children"});
        }
    } catch(err){
        res.status(500).send({message: "Error finding children with parent id: " + id});
    }

};