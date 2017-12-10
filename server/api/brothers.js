const brotherRouter = require('express').Router()
const { db, Brother } = require('../db/models')

brotherRouter.get('/', (req, res, next) => {
    Brother.findAll({
        order: [
            ['lastName', 'ASC']
        ],
        include: [{ all: true }]
    })
        .then(result => res.send(result))
        .catch(next);
})

brotherRouter.get('/:brotherId', (req, res, next) => {
    Brother.findById(req.params.brotherId)
        .then(result => res.send(result))
        .catch(next);
})

brotherRouter.post('/', (req, res, next) => {
    Brother.create(req.body)
        .then(brother => res.send(brother))
        .catch(next);
})

brotherRouter.put('/:brotherId', (req, res, next) => {
    Brother.findById(req.params.brotherId)
        .then(brother => {
            brother.update(req.body);
            res.send(brother);
        })
        .catch(next);
})

brotherRouter.delete('/:brotherId', (req, res, next) => {
    Brother.destroy({
        where: { id: req.params.brotherId }
    })
        .then(() => res.sendStatus(204).end())
        .catch(next);
})

module.exports = brotherRouter;