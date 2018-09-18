
const mongoose = require('mongoose');

var todoOps = require('../models/todo');

const url ='mongodb+srv://najiaboo:asasas(9@cluster0-pgdnv.mongodb.net/TodoApp?retryWrites=true';
mongoose.Promise = global.Promise;
mongoose.connect(url,{ useNewUrlParser: true });


var todoModel = todoOps.getModel(
    {
        text: 'Cleaning',
        completed: true,
        completedAt: 123
    }
);

todoModel.save().then((result) => {
    console.log('Saved todo', result);
}).catch((err) => {
    console.log(err);
});

// new Kitten({ name: 'Silence' });

console.log(todoModel.text);

//mongoose.disconnect();

