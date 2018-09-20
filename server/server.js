
const express = require('express')
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');

var todoOps = require('./models/todo');
var userOps = require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(req.body);

    todoOps.save(req.body).then( (result) =>{
       res.send(result);
    }).catch((err) => {
       res.status(400).send(err);
    });
});

app.listen(3000, () => {
    console.log('server started on 3000');
});


module.exports = { app };