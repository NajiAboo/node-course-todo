const mongoose = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _ = require('lodash');
const  bcrypt = require('bcryptjs');

const {Schema} = mongoose;

var userSchema = new Schema({
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function(v) {
                return validator.isEmail;
            },
            message: '{VALUE} is not an email'
        }
    },
    password : {
        required: true,
        type: String,
        minlength : 6
    },
    tokens: [{
        access: {
            require: true,
            type: String
        },
        tokens: {
            type: String,
            require: true
        }
    }]
});

userSchema.methods.generateToken = function() {
    var user  = this;
    var access = 'auth';
    var tokens  = jwt.sign({_id:user._id.toHexString(), access},'123abc').toString();

    user.tokens.push({access,tokens});

    return user.save().then(()=>{
        return tokens;
    });

}

userSchema.methods.toJSON = function() {

    var user = this;
    var uModel = _.pick(user,['email','password']);
    return uModel;
}

userSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded ;

    console.log('token: ', token);
    try{
        decoded = jwt.verify(token, '123abc');
        console.log(decoded, "decoded");
        console.log(decoded);

    } catch(e) {
        return new Promise((resolve, reject) => {
            reject();
        })
    }

    return User.findOne({_id: decoded._id,
             'tokens.tokens': token, 
             'tokens.access': decoded.access }
             );
    }

    userSchema.pre('save', function(next) {
        var user = this;
        if( user.isModified('password') ) {

            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(user.password, salt, (err, hash)=>{
                    user.password= hash;
                    next();
                });
            });
            console.log('password modified');
            console.log('next middleware is called');
        }
        else{
            next();
        }
    });

    userSchema.statics.findByCredential = function(email, password) {
        var user = this;
        var hashedpwd;

        return new Promise((resolve, reject) => 
        {

            bcrypt.genSalt(10, (err,salt) =>{
                bcrypt.hash(password, salt, (err, hash)=>{
                    hashedpwd = hash;
                    console.log('hasg1', hashedpwd);
                    user.findOne({email: email})
                    .then((user1)=>{
                        if(user1) {
                           // var upUser  = _.pick(user, ['email']);
                             resolve(user1);
                        } else{
                            reject();
                        }
                    }).catch((err)=>{
                        reject();
                    });
        
                });
            });
        });
        
    


    }

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
    save,
    userModel
}