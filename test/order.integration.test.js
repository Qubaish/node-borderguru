process.env.NODE_ENV = 'test';

const mongoose  = require("mongoose"),
      Order     = require('../order/Order');

const chai        = require('chai'),
  chaiHttp        = require('chai-http'),
  chaiMiddleware  = require('chai-connect-middleware'),
  server          = require('../app'),
  should          = chai.should();

chai.use(chaiHttp);
chai.use(chaiMiddleware);

let mockOrder = {customerName: 'Qubaish', customerAddress: 'Dubai hala Dubai', itemName: 'Macbook', price: 400, currency: 'EUR' };

describe('Orders', () => {
    beforeEach((done) => {
        Order.remove({}, (err) => {
           done();
        });
    });

    describe('/GET orders', () => {
      it('it should GET all the orders', (done) => {
        chai.request(server)
            .get('/orders')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.data.should.be.a('array');
              res.body.data.length.should.be.eql(0);
              done();
            });
        });
    });

    describe('/POST Order', () => {
      it('it should not POST a order without customer name', (done) => {
         const { customerName, ...withoutCustomerName } = mockOrder;
           chai.request(server)
           .post('/orders')
           .send(withoutCustomerName)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.status.should.have.property('error');
               res.body.status.error.includes('customerName').should.be.true;
               res.body.status.error.includes('required').should.be.true;
             done();
           });
     });

     it('it should POST a order', (done) => {
          chai.request(server)
          .post('/orders')
          .send(mockOrder)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.status.code.should.be.eql(0);
              res.body.status.should.have.property('message').eql("OK");
              res.body.data.should.have.property('customerName');
              res.body.data.should.have.property('customerAddress');
              res.body.data.should.have.property('itemName');
              res.body.data.should.have.property('price');
              res.body.data.should.have.property('currency');
            done();
          });
      });
   });

   describe('/GET/:id order', () => {
     it('it should GET a order by the given id', (done) => {
       let order = new Order(mockOrder);
       order.save((err, order) => {
           chai.request(server)
           .get('/orders/' + order.id)
           .send(order)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.data.should.have.property('customerName');
               res.body.data.should.have.property('customerAddress');
               res.body.data.should.have.property('itemName');
               res.body.data.should.have.property('price');
               res.body.data.should.have.property('currency');
               res.body.data.should.have.property('_id').eql(order.id);
             done();
           });
         });
      });

      // it('it should GET a order by the given customerName', (done) => {
      //   let order = new Order(mockOrder);
      //   order.save((err, order) => {
      //       chai.request(server)
      //       .get('/orders/customers/q')
      //       .query({name: 'qubaish'})
      //       .end((err, res) => {
      //         console.log(err);
      //         // console.log(res);
      //           console.log(err);
      //           res.should.have.status(200);
      //           // res.body.should.be.a('object');
      //           // res.body.data.should.have.property('customerName');
      //           // res.body.data.should.have.property('customerAddress');
      //           // res.body.data.should.have.property('itemName');
      //           // res.body.data.should.have.property('price');
      //           // res.body.data.should.have.property('currency');
      //           // res.body.data.should.have.property('customerName').eql(order.customerName);
      //         done();
      //       });
      //     });

   });

   describe('/PUT/:id order', () => {
     it('it should UPDATE a order given the id', (done) => {
       let order = new Order(mockOrder);
       order.save((err, order) => {
               chai.request(server)
               .put('/orders/' + order.id)
               .send({customerName: "Qubaish Pro", price: 300})
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.status.code.should.be.eql(0);
                   res.body.status.should.have.property('message').eql("OK");
                   res.body.data.should.have.property('price').eql(300);
                 done();
               });
         });
     });
   });

   describe('/DELETE/:id order', () => {
     it('it should DELETE a order given the id', (done) => {
       let order = new Order(mockOrder)
       order.save((err, order) => {
               chai.request(server)
               .delete('/orders/' + order.id)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('data').eql('Order successfully deleted!');
                 done();
               });
         });
     });
   });
});
