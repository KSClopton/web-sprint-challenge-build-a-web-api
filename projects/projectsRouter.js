const express = require('express');
const projectHelper = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/allactions/:id', (req, res) => {
    // Get list of all actions
    const {id} = req.params
    projectHelper.getProjectActions(id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message: "Could not connect"})
    })

}) // Checked!
router.get('/', (req, res) => {
    const projects = projectHelper.get()
    .then(data => {
        // console.log(projets, data)
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message: "Did not work"})
    })
}) // Checked!

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
}) // Checked!

router.delete('/:id', (req, res) => {
    // Delete project
    const {id} = req.params
    const project = projectHelper.get(id)
    if(!project){
        res.status(404).json({message: "Project does not exist"})
    }else{
    projectHelper.remove(id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json({message: "The project could not be removed"})
    })
}
}) // Checked!

router.put('/:id', (req, res) => {
    // Update project needs name or description
    const {id} = req.params
    changes = req.body
    if(!changes.name && !changes.description){
        res.status(404).json({message: "Please provide a name or description to udpate"})
    }else{
        projectHelper.update(id, changes)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({message: "The project could not be updated"})
        })
    }
}) // Checked! 

module.exports = router;