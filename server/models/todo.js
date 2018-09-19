
const mongoose = require('mongoose');

var {Schema} = mongoose;

var todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed : {
        type: Boolean,
        default: false
    },
    completedAt :{
        type: Number,
        default: null
    }
});

var todo = mongoose.model('todo',todoSchema);

function getModel(todoParms) {
     return new todo({
         text: todoParms.text,
         completed: todoParms.completed,
         completedAt: todoParms.completedAt
     });
}

function save(todoParms) {

    todoModel = getModel(todoParms);
    
    return new Promise((resolve,reject) => {
        
        todoModel.save().then( (result) => {

           resolve(result);
        }).catch( (err)=>{
             reject(err);
            });
    
    })
}

//module.exports = mongoose.model('todo',todoSchema);
module.exports = {
    getModel,
    save
};