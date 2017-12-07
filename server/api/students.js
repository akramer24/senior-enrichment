const studentRouter = require('express').Router()
const {db, Student} = require('../db/models')

studentRouter.get('/', (req, res, next) => {
    Student.findAll()
        .then(result => res.send(result))
})

studentRouter.get('/:studentId', (req, res, next) => {
    Student.findById(req.params.studentId)
        .then(result => res.send(result))
})

studentRouter.post('/', (req, res, next) => {
    Student.create(req.body)
        .then(campus => rse.send(campus))
        .catch(next);
})

module.exports = studentRouter;