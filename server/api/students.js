const studentRouter = require('express').Router()
const {db, Student} = require('../db/models')

studentRouter.get('/', (req, res, next) => {
    Student.findAll({include: [{all: true}]})
        .then(result => res.send(result))
})

studentRouter.get('/:studentId', (req, res, next) => {
    Student.findById(req.params.studentId)
        .then(result => res.send(result))
})

studentRouter.post('/', (req, res, next) => {
    Student.create(req.body)
        .then(campus => res.send(campus))
        .catch(next);
})

studentRouter.put('/:studentId', (req, res, next) => {
    console.log(req.params.studentId)
    Student.findById(req.params.studentId)
        .then(student => {
            student.update(req.body);
            res.send(student);
        })
        .catch(next);
})

studentRouter.delete('/:studentId', (req, res, next) => {
    Student.destroy({
        where: { id: req.params.studentId }
    })
        .then(() => res.sendStatus(204).end())
        .catch(next);
})

module.exports = studentRouter;