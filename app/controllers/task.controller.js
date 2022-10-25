const { DATE } = require("sequelize");
const db = require("../models/index");
const taskModel = db.task;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {

    //TODO: do more validation
    if(!req.body.title) {
        res.status(400).send({
            message: "Title may not be empty!"
        })
        return;
    }

    const newTask = {
        title: req.body.title,
        status: req.body.status,
        priority: req.body.priority,
        description: req.body.description,
        due: req.body.due,
        completed: req.body.completed || null,
        parent_id: req.body.parent_id,
        owner_id: req.body.owner_id,
        creator_id: req.body.creator_id,
    };

    try {
        const result = await taskModel.create(newTask);
        res.send(result);
    } catch (err) {
        res.status(500).send({
            message: err || "Some error occured creating this task"
        })
    }

};

exports.findOne = async (req, res) => {

    try { 
        const task = await taskModel.findByPk(req.params.id);

        if(task){
            res.send(task);
        } else {
            res.status(404).send({message: "No task with this id found"})
        }
    } catch (err) {
        res.status(500).send({
            message: err
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

    try{
        const updateResult = await taskModel.update(req.body, {where: {id: id}});
        if(updateResult[0] === 1){
            res.send({message: "Task updated successful"});
        } else {
            res.send({message: "Task update unsuccessful"});
        }
    } catch(err){
        res.status(500).send({message: "Error updating task with id: " + id});
    }

};

exports.delete = async (req, res) => {

    const id = req.params.id;

    try{
        const deleteResult = await taskModel.destroy({where: {id: id}});
        if(deleteResult[0] === 1){
            res.send({message: "Item deleted successful"});
        } else {
            res.send({message: "Item delete unsuccessful"});
        }
    } catch(err){
        res.status(500).send({message: "Error deleteing item with id: " + id});
    }

};

exports.findAllChildTasks = async (req, res) => {
  
    const parent_id = req.params.id;

    try{
        const childTasks = await taskModel.findAll({where: { parent_id: parent_id }});
        if(childTasks){
            res.send(childTasks);
        } else {
            res.send({message: "Error finding children"});
        }
    } catch(err){
        res.status(500).send({message: "Error finding children with parent id: " + id});
    }

};