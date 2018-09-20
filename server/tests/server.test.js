const expect = require('expect')
const request = require('supertest');
const {app} = require('./../server.js');
const todoOps = require('./../models/todo');

const todos = [{
    text : 'First test todo'
},{
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
})