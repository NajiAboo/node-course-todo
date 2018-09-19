const mongoose = require('mongoose');

const {Schema} = mongoose;

var userSchema = new Schema({
    email: {
        type: String,
        minlength: 1,
        required: true
    }
});


var userModel = mongoose.model('user', userSchema);

function getUserModel(parms) {
    return new userModel(parms);
}

function save(params) {
    uMode = getUserModel(params);

    uMode.save().then((result) => {
        console.log('Saved Data');
    }).catch((err) => {
        console.log('error');
    });
}

module.exports = {
    getUserModel,
    save
}