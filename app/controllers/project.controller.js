const { task } = require("../models/index");
const db = require("../models/index");
const taskModel = db.task;
const projectModel = db.project;
const Op = db.Sequelize.Op;
const { QueryTypes } = require("sequelize");

exports.create = async (req, res) => {
  
    if(!req.body.title) {
        res.status(400).send({
            message: "Title may not be empty!"
        })
        return;
    }

    const newProjectTask = {
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

    try{
        const createdTask = await taskModel.create(newProjectTask);

        const project = {
            task_id: createdTask.dataValues.id
        }

        try {
            const createdProject = await projectModel.create(project);
            res.send(createdProject);
        } catch (err) {
            res.send({message: err || "Error creating project"})
        }

    } catch (err) {
        res.send({message: err || "Error creating project task"})
    }

};


exports.findOne = async (req, res) => {
  
    const id = req.params.id;

    try {
        const requestedProject = await projectModel.findByPk(id);

        if(!requestedProject) res.send({message: "No project with id " + id + "found" });

        const projectTaskId = requestedProject.dataValues.task_id;

        try {
            const projectTask = await taskModel.findByPk(projectTaskId);

            if(!projectTask) res.send({message: "Error getting project's task with task id: " + id});

            requestedProject.dataValues.task = projectTask.dataValues;

            res.send(requestedProject);

        } catch (err) {
            res.send({message: "Error getting projects Task"});
        }
        
    } catch (err) {
        res.send({message: err || "Error getting project with id: " + id});
    }

};

exports.findAll = async (req, res) => {

    try {

        const projects = await db.sequelize.query(
        `SELECT p.*, 
        JSON_OBJECT(
        'id', t.id, 
        'title', t.title,
        'status', t.status,
        'priority', t.priority,
        'description', t.description,
        'due', t.due,
        'completed', t.completed,
        'parent_id', t.parent_id,
        'owner_id', t.owner_id,
        'creator_id', t.creator_id,
        'createdAt', t.createdAt,
        'updatedAt', t.updatedAt) as task
        FROM Projects p INNER JOIN Tasks t ON p.task_id = t.id`
        , { type: QueryTypes.SELECT });

        if(!projects) res.send({message: "Error getting all projects or none"})

        res.send(projects);


    } catch (err){
        res.send({message: "Error getting all projects"});
    }


};

exports.update = async (req, res) => {
  
    const id = req.params.id;

    try{
        const updateResult = await db.sequelize.query(
            `UPDATE Tasks t
            INNER JOIN Projects p ON t.id = p.task_id
            SET t.title = :title,
            t.description = :description
            WHERE p.id = :projectId`
            , { 
                replacements: {title : req.body.task.title, description: req.body.task.description, projectId: req.params.id},
                type: QueryTypes.UPDATE 
            });

        if(updateResult[1] === 1){
            res.status(202).send();
        } else {
            throw Error("Failed to update one row");
        }
       
    } catch (err) {
        res.status(500).send({message: "Error updating project with id"});
    }

};

exports.delete = async (req, res) => {

    const id = req.params.id;

    //delete child tasks
    try {

        const projectToDelete = await projectModel.findByPk(id);

        if(!projectToDelete) res.send({message: "No project with id " + id + "found" });

        await taskModel.destroy({ where: {parent_id: projectToDelete.dataValues.task_id}});

        const result = await taskModel.destroy({ where: {id: projectToDelete.dataValues.task_id}});

        if(!(result === 1)) {
            res.send({
              message: `Cannot delete item with id=${id}. Maybe item was not found!`
            });
        }

    } catch(err) {

        res.status(500).send({
            message: "Could not delete item with id=" + id
        });
    }

    //delete project
    try {
        const result = await projectModel.destroy({ where: {id: id}});

        if(result === 1) {
            res.status(202).send();
        } else {
            res.send({
              message: `Cannot delete item with id=${id}. Maybe item was not found!`
            });
        }

    } catch(err) {
        res.status(500).send({
            message: "Could not delete item with id=" + id
        });
    }



};