const express = require('express');
const projectHelper = require('../data/helpers/projectModel');
const db = require('../dbConfig.js');
const mappers = require('./mappers');

const router = express.Router();

router.get('/:id', validateProjectID, (req, res) => {
    // Get list of all actions
    const {id} = req.params
    projectHelper.getProjectActions(id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message: "Could not connect"})
    })

})

router.post('/', (req, res) => {
    // Post new project needs name and description
    const newProject = req.body
    if(!newProject.name || !newProject.description){
        res.status(404).json({message: "Please provide project ID and description of the Project"})
    }else{
       projectHelper.insert(newProject)
       .then(data => {
           res.status(201).json(newProject);
       }) 
       .catch(error => {
           res.status(500).json({message: "The Project was not added"})
       })
    }
})

router.delete('/:id', (req, res) => {
    // Delete project
})

router.put('/:id', (req, res) => {
    // Update project needs name or description
})
function validateProjectID(req, res, next) {
    const {id} = req.params
    actionHelper.get(id)
    .then(data => {
        const data = req.actions
        next();
    })
    .catch(error => {
        res.status(500).json({message: "Invalid User ID"})
    })
}
module.exports = router;