const {MongoClient} = require('mongodb');

const url ='mongodb+srv://najiaboo:asasas(9@cluster0-pgdnv.mongodb.net/TodoApp?retryWrites=true';

MongoClient.connect(url, { useNewUrlParser: true },(err, client)=> {

    if (err) {
        return console.log('fail to connect');
    }

    console.log('Connect success!!');

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false

    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo');
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // });

    // Add users

    db.collection('Users').insertOne({
        name : 'Naji Aboo',
        age: 18,
        location: 'India'

    }, (err, result)=>{

        if (err) {
          return  console.log('Fail to insert record');
        }
        
        console.log(JSON.stringify(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2)));

    });



    client.close();

});