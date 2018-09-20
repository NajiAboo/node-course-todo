
const express = require('express')
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');


var todoOps = require('./models/todo');
var userOps = require('./models/user');


var app = express();

const port =process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    console.log(req.body);

    todoOps.save(req.body).then( (result) =>{
       res.send(result);
    }).catch((err) => {
       res.status(400).send(err);
    });
});

app.get('/todos',(req,res) => {
    todoOps.find().then((result) => {

        res.send({
            todo: result
        });

    }).catch((err)=>{

        res.status(400).send(err);
    })
    

});

app.get('/todos/:id',(req,res)=>{

    var id = req.params['id'];

    console.log(id);
    if ( !(ObjectID.isValid(id))) {
        return res.status(404).send({message: `Invalid object id ${id}`});
    }
     
    todoOps.todo.findById(id).then((result) => {

        if ( null != result ){
           return  res.send({
                todo: result
            });
        } else {
            return res.status(404).send({message: `Invalid object id ${id}`});
        }
      
    }).catch( (err) => {
        return res.status(400).send({message: `Invalid object id ${id}`});
    })

});

app.listen(port, () => {
    console.log(`server started on ${port}`);
});


module.exports = { app };