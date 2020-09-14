const express = require('express');
const actionHelper = require('../data/helpers/actionModel');
const router = express.Router();

router.post('/:id', (req, res) => {
    // Post an action to a project
    const {id} = req.params
    const newAction = req.body
    if(!newAction.project_id || !newAction.description || !newAction.notes){
        res.status(404).json({message: "Please provide project ID and description of the action"})
    }else{
       actionHelper.insert(newAction, id)
       .then(data => {
           res.status(201).json(data);
       }) 
       .catch(error => {
           console.log(error)
           res.status(500).json({message: "The newAction was not added"})
       })
    }
    
}) // Checked!

router.get('/:id', (req, res) => {
    // Get list of all actions
    const {id} = req.params
    actionHelper.get(id)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(404).json({message: "That ID does not exist"})
    })
}) // Checked!

router.delete('/:id', (req, res) => {
    // Delete an an action on a project
    const {id} = req.params
    const action = actionHelper.get(id)
    if(!action){
        res.status(404).json({message: "Could not find that action"})
    }else{
        actionHelper.remove(id)
        .then(data => {
        res.status(200).json({message: "The action has been nuked"})
    })
    .catch(error => {
        res.status(500).json({message: "There was a problem removing the user"})
    })
    }
}) // Checked!

router.put('/:id', (req, res) => {
    // Update an action
    const {id} = req.params
    const changes = req.body

    if(!changes.description && !changes.project_id && !changes.notes){
        res.status(404).json({message: "Please provide a description or a project_id to update"})
    }else{
        actionHelper.update(id, changes)
        .then(data => {
            res.status(200).json({message: "The action has been updated"})
        })
        .catch(error => {
            res.status(500).json({message: "There was a problem updating the action"})
        })
    }
}) // Checked!


module.exports = router;