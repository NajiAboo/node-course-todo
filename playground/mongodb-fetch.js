const {MongoClient} = require('mongodb');

const url ='mongodb+srv://najiaboo:asasas(9@cluster0-pgdnv.mongodb.net/TodoApp?retryWrites=true';

MongoClient.connect(url, { useNewUrlParser: true },(err, client)=> {

    if (err) {
        return console.log('fail to connect');
    }

    console.log('Connect success!!');

    const db = client.db('TodoApp');

    db.collection('Todos').find().toArray()
            .then((docs) => {
                console.log(JSON.stringify(docs,undefined,2));
            }, (err) => {
                console.log('error');
            }); 
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false

    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo');
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // });

    client.close();

});