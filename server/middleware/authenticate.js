var userOps = require('./../models/user');

var authenticate = function (req,res,next) {

    var tokens = req.header('x-auth');

    userOps.userModel.findByToken(tokens).then((user) => {
       req.user = user;
       next();

    }).catch((err) => {
        res.status(401).send();
    });

}


module.exports = { authenticate}