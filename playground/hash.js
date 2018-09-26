const jwt =  require('jsonwebtoken');
const  bcrypt = require('bcryptjs');

var data = {
    id: 10
}

var password = 'abc123';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log(hash);
//     });
// });

var hash = '$2a$10$9g8rVd4BeGvRamQyL2M9sO9egY06k1xC56BbYifLxMnbiAf1XUBIa'
bcrypt.compare(password, hash, (err,res) =>{
    console.log(res);
} );

// var token = jwt.sign(data,'123');
// console.log(token);

// var decoded = jwt.verify(token,'123');
// console.log(decoded);