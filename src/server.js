const app = require('./app/index');
const port = app.get('port');

//listen
app.listen(port, ()=>{
    console.log(`>>>>>>>>>>>>>>>>> Server running on port ${port}`);
})

// consumimos Fake_API

fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(json=>json);
