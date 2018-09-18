const {MongoClient, ObjectID} = require('mongodb');

const url ='mongodb+srv://najiaboo:asasas(9@cluster0-pgdnv.mongodb.net/TodoApp?retryWrites=true';

MongoClient.connect(url, { useNewUrlParser: true },(err, client)=> {

    if (err) {
        return console.log('fail to connect');
    }

    console.log('Connect success!!');

    const db = client.db('TodoApp');

    db.collection('Todos').findOneAndUpdate(
        {_id: new ObjectID('5b9f5e680e0ba145a08168b2')},
        {$set: {completed:true}},
        {returnOriginal: false}
        ).then((result)=>{
            console.log(result);
        });
     
    client.close();


});