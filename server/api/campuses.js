const campusRouter = require('express').Router()
const {db, Campus, Student} = require('../db/models')

campusRouter.get('/', (req, res, next) => {
    Campus.findAll()
        .then(result => res.send(result))
        .catch(next)
})

campusRouter.get('/:campusId', (req, res, next) => {
    Campus.findById(req.params.campusId)
        .then(result => res.send(result))
        .catch(next)
})

campusRouter.post('/', (req, res, next) => {
    Campus.create(req.body)
        .then(campus => res.send(campus))
        .catch(next);
})

module.exports = campusRouter;