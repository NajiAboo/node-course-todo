const {ObjectID} = require('mongodb');
const todoOps = require('./../../models/todo');
const jwt = require('jsonwebtoken');
var userOps = require('./../../models/user');

const todos = [{
    _id : new ObjectID(),
    text : 'First test todo'
},{
    _id : new ObjectID(),
    text: 'Second test todo'
}];

const userOneId = new ObjectID();
const userSecondId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'naji@tagrail.com',
    password: 'userone',
    tokens: [{
        access : 'auth',
        tokens: jwt.sign({_id: userOneId.toHexString(), access:'auth'}, '123abc')
    }]
}, {
    _id: userSecondId,
    email: 'naji1@tagrail.com',
    password: 'usertwo'   
}];




const populateTodos = (done) =>{
    //delete record
    todoOps.remove().then(() => {
        return todoOps.todo.insertMany(todos)
    }).then(() => done())};


    const populateUsers = (done) => {
    
        userOps.userModel.remove({}).then(() => {
            var user1 =  new  userOps.userModel(users[0]).save();
            var user2 = new userOps.userModel(users[1]).save();
    
            return Promise.all([user1, user2]);
        }).then(()=> done());
    };
    

    module.exports = { populateTodos, todos, users, populateUsers}