const expect = require('expect')
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server.js');
const todoOps = require('./../models/todo');

const todos = [{
    _id : new ObjectID(),
    text : 'First test todo'
},{
    _id : new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) =>{
    //delete record
    todoOps.remove().then(() => {
        return todoOps.todo.insertMany(todos)
    }).then(() => done());
});

describe('Server test',() => {

     it('should create new todo', (done) => {
       
        var text = 'test todo';

        request(app)
            .post('/todos')
            .send({text})
            .set('Accept', 'application/json')
            .expect(200)
            .expect((result)=>{
                expect(result.body.text).toBe(text);

            })
            .end( (err, res) => {

                if (err) {
                    return  done(err);
                }

              todoOps.find({text: text}).then((result)=>{
                  // Need to delete record beforeeach block
                 expect(result.length).toBe(1);
                 expect(result[0].text).toBe(text);
                  done();
              }).catch( ( err)=> {
                  done(err);
              })

            });
     });

}); // describe

describe('GET/todos',() =>{
    
    it('should return value', (done) =>{
        request(app)
         .get('/todos')
         .expect(200)
         .expect( (result) => {
             expect(result.body.todo.length).toBe(2)
         }).end(done)

    });

    it('should have return single value', (done) =>{
        request(app)
         .get(`/todos/${todos[0]._id}`)
         .expect(200)
         .expect((result) => {
            expect(result.body.todo._id).toBe(`${todos[0]._id}`);
         }).end( (err, rslt) => {
            if (err) {
                return done(err);
            }

            done();
         });

    });

    it('should return 404',(done) => {
        request(app)
        .get(`/todos/${new ObjectID()}`)
        .expect(404)
        .end(done);

    });
})