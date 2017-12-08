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

campusRouter.put('/:campusId', (req, res, next) => {
    Campus.findById(req.params.campusId)
        .then(campus => campus.update(req.body))
        .catch(next);
})

campusRouter.delete('/:campusId', (req, res, next) => {
    Campus.destroy({
        where: { id: req.params.campusId }
    })
        .then(() => res.sendStatus(204).end())
        .catch(next);
})

module.exports = campusRouter;