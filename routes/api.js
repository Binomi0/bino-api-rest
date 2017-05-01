var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next) {

    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null ){
        res.json({
            confirmation: 'fallo',
            message: 'Recurso no válido: '+resource
        })
    }

    controller.find(req.query, function(err, results){
        if(err){
            res.json({
                confirmation: 'fail',
                message: err
            })
            return
        }

        res.json({
            confirmation:'success',
            results: results
        })
    })
})



router.get('/:resource/:id', function(req, res, next){

    var resource = req.params.resource
    var id = req.params.id

    var controller = controllers[resource]
    if (controller == null ){
        res.json({
            confirmation: 'fallo',
            message: 'Recurso no válido: '+resource
        })
        return
    }

    controller.findById(id, function(err, result){
        if (err) {
            res.json({
                confirmation: 'fallo',
                message: 'ID no válida: '+id
            })
            return
        }

        res.json({
            confirmation: 'success',
            result
        })
    })
})



router.post('/:resource', function(req,res, next){

    var resource = req.params.resource
    var controller = controllers[resource]
    if (controller == null ){
        res.json({
            confirmation: 'fallo',
            message: 'Recurso no válido: '+resource
        })
        return
    }

    controller.create(req.body, function(err, result){
        if(err){
            res.json({
                confirmation: 'fail',
                message: err
            })
            return
        }

        res.json({
            confirmation: 'success',
            result
        })
    })
})

module.exports = router