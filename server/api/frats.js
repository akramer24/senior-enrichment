const fratRotuer = require('express').Router()
const {db, Frat, Brother} = require('../db/models')

fratRotuer.get('/', (req, res, next) => {
    Frat.findAll({
        order: [
            ['name', 'ASC']
        ]
    })
        .then(result => res.send(result))
        .catch(next)
})

fratRotuer.get('/:fratId', (req, res, next) => {
    Frat.findById(req.params.fratId)
        .then(result => res.send(result))
        .catch(next)
})

fratRotuer.post('/', (req, res, next) => {
    Frat.create(req.body)
        .then(frat => res.send(frat))
        .catch(next);
})

fratRotuer.put('/:fratId', (req, res, next) => {
    Frat.findById(req.params.fratId)
        .then(frat => {
            frat.update(req.body);
            res.send(frat);
        })
        .catch(next);
})

fratRotuer.delete('/:fratId', (req, res, next) => {
    Frat.destroy({
        where: { id: req.params.fratId }
    })
        .then(() => res.sendStatus(204).end())
        .catch(next);
})

module.exports = fratRotuer;