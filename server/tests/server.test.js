const expect = require('expect')
const request = require('supertest');
const {app} = require('./../server.js');
const todoOps = require('./../models/todo');

describe('Server test',() => {

    beforeEach(() =>{
        //delete record
    })
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

              todoOps.find().then((result)=>{
                  // Need to delete record beforeeach block
                 // expect(result.length).toBe(1);
                 // expect(result[0].text).toBe(text);
                  done();
              }).catch( ( err)=> {
                  done(err);
              })

            });
     });

}); // describe