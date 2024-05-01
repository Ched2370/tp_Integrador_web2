const router = require('express').Router();

router.get('/', (req, res, next)=> {
    res.render('index')
    next()
});

router.get('/products', (req, res) => {
    fetch('https://fakestoreapi.com/products')
    .then((res) => {res.json()})
    .then((json) => {json.forEach(element => {
        console.log(element.title);
    })
    res.send(element.title)
})
});

module.exports = router