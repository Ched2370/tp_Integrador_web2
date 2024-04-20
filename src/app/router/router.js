const router = require('express').Router()

router.get('/', (req, res, next)=> {
    res.render('index')
    next() // next nos hace ejecutar el siguiente midleware, es una buena practica
})

module.exports = router