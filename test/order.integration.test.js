process.env.NODE_ENV = 'test';

const mongoose  = require("mongoose"),
      Order     = require('../src/order/Order');

const chai        = require('chai'),
  chaiHttp        = require('chai-http'),
  chaiMiddleware  = require('chai-connect-middleware'),
  server          = require('../app'),
  should          = chai.should();

chai.use(chaiHttp);
chai.use(chaiMiddleware);

let mockOrder = {customerName: 'Qubaish', customerAddress: 'Dubai hala Dubai', itemName: 'Macbook', price: 400, currency: 'EUR' };

describe('Integration tests Orders', () => {
    beforeEach((done) => {
        Order.remove({}, (err) => {
           done();
        });
    });

    describe('/GET orders', () => {
      it('it should GET all the orders', (done) => {
        chai.request(server)
            .get('/api/orders')
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
           .post('/api/orders')
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
          .post('/api/orders')
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
           .get('/api/orders/' + order.id)
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

      it('it should GET a orders by the given Customer Name', (done) => {
        let order = new Order(mockOrder);
        order.save((err, order) => {
            chai.request(server)
            .get('/api/orders/customers/q')
            .query({name: 'Qubaish'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(1);
              done();
            });
          });
        });

      it('it should GET a orders by the given Customer Address', (done) => {
        let order = new Order(mockOrder);
        order.save((err, order) => {
            chai.request(server)
            .get('/api/orders/customers/q')
            .query({address: 'Dubai hala Dubai'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.should.be.a('array');
                res.body.data.length.should.be.eql(1);
              done();
            });
          });
        });

      it('it should GET a error when no filters is provided', (done) => {
        let order = new Order(mockOrder);
        order.save((err, order) => {
            chai.request(server)
            .get('/api/orders/customers/q')
            .query({})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.code.should.be.eql(1);
                res.body.status.should.have.property('error').eql("Empty Filters");
              done();
          });
        });
      });
   });

   describe('/PUT/:id order', () => {
     it('it should UPDATE a order given the id', (done) => {
       let order = new Order(mockOrder);
       order.save((err, order) => {
               chai.request(server)
               .put('/api/orders/' + order.id)
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
               .delete('/api/orders/' + order.id)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('data').eql('Order successfully deleted!');
                 done();
               });
         });
     });
   });

   describe('/GET Items', () => {
     it('it should Get a list with all the item names and how many times they have been ordered', (done) => {
       let order = new Order(mockOrder);
       let order1 = new Order(mockOrder);
       order.save((err, order) => {
         order1.save((err, order1) => {
               chai.request(server)
               .get('/api/orders/items/ordered')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.data.should.be.a('array');
                   res.body.data[0].should.have.property('total_ordered');
                   res.body.data[0].should.have.property('total_ordered').eql(2);
                 done();
               });
         });
       });
     });

     it('it should Get a list with all the item names and sort their names alphabetically', (done) => {
       let order = new Order(mockOrder);
       mockOrder.itemName = "Apple";
       let order1 = new Order(mockOrder);
       order.save((err, order) => {
         order1.save((err, order1) => {
               chai.request(server)
               .get('/api/orders/items/ordered')
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.data.should.be.a('array');
                   res.body.data[0]._id.should.have.property('itemName');
                   res.body.data[0]._id.should.have.property('itemName').eq("Apple");
                   res.body.data[1]._id.should.have.property('itemName').eq("Macbook");
                 done();
               });
         });
       });
     });
   });
});
