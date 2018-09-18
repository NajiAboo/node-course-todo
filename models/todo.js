
const mongoose = require('mongoose');

var {Schema} = mongoose;

var todoSchema = new Schema({
    text: {
        type: String
    },
    completed : {
        type: Boolean
    },
    completedAt :{
        type: Number
    }
});

var todo = mongoose.model('todo',todoSchema);

function getModel(todoParms) {
     return new todo(todoParms);
}

//module.exports = mongoose.model('todo',todoSchema);
module.exports = {
    getModel
};