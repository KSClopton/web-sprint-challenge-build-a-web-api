const express = require('express');

const db = require('../dbConfig.js');
const mappers = require('./mappers');

const router = express.Router();

router.get('/:id', validateProjectID, (req, res) => {
    // Get list of all actions
    res.status(200).json(req.actions)

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