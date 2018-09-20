const request = require('supertest');

const {app} = require('./../server.js');
const todoOps = require('./../models/todo');

// describe('Server test',() => {

//      it('should create new todo', (done) => {
       
//         var text = 'test todo';

//         request(app)
//             .post('/todos')
//             .send({text})
//             .set('Accept', 'application/json')
//             .expect(200)
//             .end( (err, res) => {

//                 if (err) {
//                     return  done(err);
//                 }

//                 done();

//             });
//      });



// }); // describe


// describe('POST /todos', ()=> {
//     it('responds with json', (done) =>{
//       request(app)
//         .post('/todos')
//         .send({text: 'john'})
//         .expect(200)
//         .expect( (result) =>{
//             expect(result.body.text).toBe('1');
//         })
//         .end(function(err, res) {
//           if (err) return done(err);
//           done();
//         }).catch(done);
//     });
//   });