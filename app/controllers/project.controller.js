const db = require("../models/index");
const WorkItem = db.workItem;
const Project = db.project;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    //TODO: more validation to make sure we got sent everything we require
  
    if(!req.body.title) {
        res.status(400).send({
            message: "Title may not be empty!"
        })
        return;
    }

    //Create the Project's Work Item followed by the Project
    const workItem = {
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

    WorkItem.create(workItem)
    .then(data => {

        const project = {
            item_id: data.dataValues.id
        }

        Project.create(project)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err | "Could not create project"
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err || "Some error occured creating this item"
        })
    });

};


exports.findOne = (req, res) => {
  
    const id = req.params.id;

    Project.findByPk(id)
    .then(data => {
        if(data){
            res.send(data);
        } else {
            res.status(404).send({message: "No project id found"});
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error retrieving project by id"});
    });

};

exports.update = (req, res) => {
  
    const id = req.params.id;

    Project.update(req.body, {
        where: {id: id}
    })
    .then(updated => {
        if(updated[0] === 1){
            res.send({message: "Project updated successfully"});
        } else {
            res.send({message: "Cannot update project with this id"});
        }
    })
    .catch(err => {
        res.status(500).send({message: "Error updating item with id"});
    })
};

exports.delete = (req, res) => {

    const id = req.params.id;

    Project.destroy({
        where: { id: id }
      })
        .then(result => {
          if (result[0] == 1) {
            res.send({
              message: "Item was deleted successfully!"
            });
          } else {
            res.send({
              message: `Cannot delete item with id=${id}. Maybe item was not found!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete item with id=" + id
          });
        });
};