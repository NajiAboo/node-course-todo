const {MongoClient} = require('mongodb');

const url ='mongodb+srv://najiaboo:asasas(9@cluster0-pgdnv.mongodb.net/TodoApp?retryWrites=true';

MongoClient.connect(url, { useNewUrlParser: true },(err, client)=> {

    if (err) {
        return console.log('fail to connect');
    }

    console.log('Connect success!!');

    const db = client.db('TodoApp');

    // Deletemany
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then( (result) =>{
    //     console.log(result);
    // });

    db.collection('Todos').deleteOne({text:'Eat lunch'}).then( (result) => {
        console.log(result);
    });
    client.close();

});