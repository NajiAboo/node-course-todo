const mongoose = require('mongoose');
const {ObjectId} = mongoose;

const url ='mongodb+srv://najiaboo:asasas(9@cluster0-pgdnv.mongodb.net/TodoApp?retryWrites=true';
mongoose.Promise = global.Promise;
mongoose.connect(url,{ useNewUrlParser: true });


module.exports = {
    mongoose
}