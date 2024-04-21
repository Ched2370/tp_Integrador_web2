const app = require('./app/index');
const port = app.get('port');

//listen
app.listen(port, ()=>{
    console.log(`>>>>>>>>>>>>>>>>> Server running on port ${port}`);
})


