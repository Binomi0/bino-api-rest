var express = require('express')
var router = express.Router()
//var auth = require('../middlewares/auth')
var controllers = require('../controllers')

router.get('/', function(req, res, next){
    res.send('Bienvenido a la API del club de Karate Gymnoray')
})
var usercontrol = controllers['user']
router.post('/signup', usercontrol.signUp)
router.post('/signin', usercontrol.signIn)

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



// router.get('/:resource/:id', function(req, res, next){

//     var resource = req.params.resource
//     var id = req.params.id

//     var controller = controllers[resource]
//     if (controller == null ){
//         res.json({
//             confirmation: 'fallo',
//             message: 'Recurso no válido: '+resource
//         })
//         return
//     }

//     controller.findById(id, function(err, result){
//         if (err) {
//             res.json({
//                 confirmation: 'fallo',
//                 message: 'ID no válida: '+id
//             })
//             return
//         }

//         res.json({
//             confirmation: 'success',
//             result
//         })
//     })
// })

router.get('/:resource/:codigo', function(req, res, next) {

    var resource = req.params.resource
    var controller = controllers[resource]
    var id = req.params.codigo

    if (controller == null ) {
        res.json({
            confirmation: 'Fallo',
            message: 'Recurso no válido: '+resource
        })
        return
    }
    if (id == null) {
        res.json({
            confirmation: 'Fallo',
            message: 'Id no válida: '+id
        })
        return
    }

    controller.find({ 'codigo': id }, function(err, result) {
        if (err) {
            res.json({
                confirmacion: 'Fallo',
                message: `Recurso no válido ${resource}, Id no válida ${id}`
            })
            return
        }

        if (result.length >= 1) {
            res.json({
                confirmation: 'success',
                result
            })        
        }
    })
})



router.post('/:resource', function(req,res, next){
    console.log('POST, Resource: ', req.params.resource)
    var resource = req.params.resource
    var controller = controllers[resource]

    if (controller == null ){
        res.json({
            confirmation: 'fallo',
            message: 'Recurso no válido: '+resource
        })
        return
    }
    
    if(resource == 'atleta'){
        //controller.find({ 'codigo': req.body.codigo }, function(err, result){
            // if (err) {
            //     res.json({
            //         confirmation: 'No se encuenta el codigo en "atleta"',
            //         message: err.message
            //     })
            //     return
            // }

            controller.create(req.body, function(err, result) {
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
        //})
    } else {
        controller.find({ 'email': req.body.email }, function(err, result){
        if(err){
            res.json({
                confirmation: 'Fail!!!',
                message: err
            })
            return
        }
        if (result.length >= 1) {
            res.json({
                confirmation: 'Error, Ya existe un usuario registrado con ese correo electrónico',
                resultado: req.body.email
            })
            return
        } else {
            if (req.body.email === null) {
                res.json({
                    confirmacion: 'No ha introducido correo electrónico',
                    result
                })
            } else {
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
            }            
        }
    });
    }

     
})

// router.post('/:resource/:codigo', function(req, res, next){
//     var resource = req.params.resource
//     var codigo = req.params.codigo
//     console.log('Recibida peticion con estos parametros', req.body, 'codigo: ', codigo)
//     var controller = controllers[resource]
//     if (controller == null ){
//         res.json({
//             confirmation: 'fallo',
//             message: 'Recurso no válido: '+resource
//         })
//         return
//     }
//     controller.find({ 'codigo': codigo}, function(err, result){
//         if(err){
//             console.log('Ha ocurrido un error en la búsqueda del codigo :', req.body.codigo)
//             return
//         }
//         if (result.length >= 1) {
//             console.log('¡Encontrado Club!', codigo)
//             controller.modify(codigo, req.body, function(err, result){
//                 if(err){
//                     res.json({
//                         confirmation: 'fail',
//                         message: err
//                     })
//                     return
//                 }
//                 var numeroAtletas = result.participantes.length
//                 console.log('Numero de atletas en el club: ', numeroAtletas)                
//                 res.json({      
//                     confirmation: 'success',
//                     club: result.club,
//                     result: result.participantes[numeroAtletas-1]
//                 })                
//                 console.log('RESPUESTA: ', result)
//                 result.participantes = req.body 
//                 //res.render('index', { club: req.body.club })               
//             })
//         } else {
//             console.log('INFO: El código de club introducido no existe.', req.body.codigo)
//             res.json({
//                 confirmacion: 'No existe un club con esa clave',
//                 result
//             })
//         }        
//     })    
// })
router.delete('/:resource/:action/:id', function(req, res) {
    console.log(`Recibida peticion DELETE to ${req.params.action}, (API.js)`, 'ID: ', req.params.id)
    var resource = req.params.resource
    var action = req.params.action
    var id = req.params.id
    var controller = controllers[resource]

    controller.delete(id, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'Error en el proceso de borrado',
                message: err
            })
            return
        }
        console.log('RESULT: ', result)
        res.json({
            confirmation: 'Borrado OK',
            result
        })
    })
})
router.post('/:resource/:action/:id', function(req, res) {
    console.log(`recibida request to ${req.params.action}, (API.js)`, 'ID: ', req.params.id)
    var resource = req.params.resource
    var action = req.params.action
    var id = req.params.id
    var controller = controllers[resource]

    controller.delete(id, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'Error en el proceso de borrado',
                message: err
            })
            return
        }
        console.log('RESULT: ', result)
        res.json({
            confirmation: 'Borrado OK',
            result
        })
    })
})


router.post('/:resource/:codigo', function(req, res, next){
    var resource = req.params.resource
    var codigo = req.params.codigo
    console.log('Recibida peticion con estos parametros2', req.body, 'codigo: ', codigo)
    var controller = controllers[resource]

    if (codigo == 'delete') {
        console.log('Borrando atleta', req.body.id)
        controller.delete(req.body.id, function(err, result) {
            if (err) {
                res.json({
                    confirmation: 'Error en el proceso de borrado2',
                    message: err.message
                })
                return
            }
            console.log('RESULT: ', result)
            res.json({
                confirmacion: 'Borrado OK',
                result
            })
        }) 
    
    } else {
        if (controller == null ){
            res.json({
                confirmation: 'fallo',
                message: 'Recurso no válido: '+resource
            })
            return
        }
        controller.find({ 'codigo': codigo}, function(err, result){
            if(err){
                console.log('Ha ocurrido un error en la búsqueda del codigo :', req.body.codigo)
                return
            }
            if (result.length >= 1) {
                console.log('¡Encontrado Club!', codigo)
                controller.modify(codigo, req.body, function(err, result){
                    if(err){
                        res.json({
                            confirmation: 'fail',
                            message: err
                        })
                        return
                    }
                    var numeroAtletas = result.participantes.length
                    console.log('Numero de atletas en el club: ', numeroAtletas)                
                    res.json({      
                        confirmation: 'success',
                        club: result.club,
                        result
                    })                
                    console.log('RESPUESTA: ', result)
                    //result.participantes = req.body 
                    //res.render('index', { club: req.body.club })               
                })
            } else {
                console.log('INFO: El código de club introducido no existe.', req.body.codigo)
                console.log('INFO: Creando atleta...', req.body.nombre)
                controller.create(req.body, function(err, result) {
                    if(err) {
                        res.json({
                            confirmation: 'Fallo creando el atleta',
                            result
                        })                    
                    }
                    console.log('Atleta creado correctamente', result)
                    res.json({
                        confirmation: 'success',
                        result
                    })
                })            
            }        
        })         
    }       
})




module.exports = router