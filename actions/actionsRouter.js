const express = require('express');
const db = require('../dbConfig.js');
const mappers = require('./mappers');
const actionHelper = require('../data/helpers/actionModel');
const projectHelper = require('../data/helpers/projectModel');
const { router } = require('../server.js');
const router = express.Router();

router.post('/', (req, res) => {
    // Post an action to a project
   const newAction = req.body
    if(!newAction.project_id || !newAction.description){
        res.status(404).json({message: "Please provide project ID and description of the action"})
    }else{
       actionHelper.insert(newAction)
       .then(data => {
           res.status(201).json(newAction);
       }) 
       .catch(error => {
           res.status(500).json({messgae: "The newAction was not added"})
       })
    }
    
})

router.get('/:id', validateProjectID, (req, res) => {
    // Get list of all actions
    res.status(200).json(req.actions)

})

router.delete('/:id', (req, res) => {
    // Delete an an action on a project
    
})

router.put('/:id/', (req, res) => {
    // Update an action
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

module.exports = express.Router();