
const express = require('express')
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var todoOps = require('./models/todo');
var userOps = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


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


app.delete('/todos/:id', (req,res) => {

    // get the id 
    var id =  req.params['id'];

    // validate the id => if not send 404
    if(!ObjectID.isValid(id)) {
        return res.status(404).send({message: 'id is not valid'});
    }

    todoOps.todo.findByIdAndRemove(id).then((result) =>{

        if (!result) {
            return res.status(404).send({message:'No record found'});
        }

        return res.status(200).send({todo : result});

    }).catch((err) =>{
        return res.status(400).send({message: 'error occured'});
    });

}) ;

app.post('/users',(req, res) => {
    console.log(req.body);
    var user = _.pick(req.body,['email', 'password']);
    var userModel = userOps.getUserModel(user);

     userModel.save().then(() => {
           return userModel.generateToken();
          }).then((token) => {
              console.log('Token: ', token);
              console.log(userModel);
            return  res.header('x-auth',token).send({user: userModel});
          }).catch((err) => {
        return res.status(404).send({message: 'fail to save'+ err});
    });
});



app.get('/users/me',authenticate, (req, res) => {

    res.send({user: req.user});
    // var tokens = req.header('x-auth');

    //  userOps.userModel.findByToken(tokens).then((user) => {
    //      console.log(user);
    //      res.send({user})
    //  }).catch((err) => {
    //      res.status(401).send();
    //  });

});

app.post('/users/login',(req,res) => {
    var body = _.pick(req.body, ['email','password'])

    var email = body.email;
    var password = body.password;

    userOps.userModel.findByCredential(email, password)
    .then((user)=> {
        res.send(user)
    }).catch((err) =>{

    })
   
   

    
     
   
});

app.listen(port, () => {
    console.log(`server started on ${port}`);
});


module.exports = { app };