process.env.NODE_ENV = 'test';

const mongoose  = require("mongoose"),
      Customer  = require('../src/customer/Customer'),
      Order     = require('../src/order/Order');

const chai        = require('chai'),
  chaiHttp        = require('chai-http'),
  chaiMiddleware  = require('chai-connect-middleware'),
  server          = require('../app'),
  should          = chai.should();

chai.use(chaiHttp);
chai.use(chaiMiddleware);

let mockCustomer = {customerName: 'Qubaish', customerAddress: 'Dubai hala Dubai', email: "qbhatti143@gmail.com", phone: "+97189899898", customerType: "Guest" };
let mockOrder = {customerName: 'Qubaish', customerAddress: 'Dubai hala Dubai', itemName: 'Macbook', price: 400, currency: 'EUR' };

describe('Integration tests Customers', () => {
    beforeEach((done) => {
        Customer.remove({}, (err) => {
          Order.remove({}, (err) => {
            done();
          });
        });
      });

    describe('/GET/:id customer', () => {
      it('it should GET a customer by the given id', (done) => {
        let customer = new Customer(mockCustomer);
        customer.save((err, customer) => {
            chai.request(server)
            .get('/api/customers/' + customer.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.should.have.property('customerName');
                res.body.data.should.have.property('customerAddress');
                res.body.data.should.have.property('phone');
                res.body.data.should.have.property('email');
                res.body.data.should.have.property('customerType');
                res.body.data.should.have.property('orders');
                res.body.data.orders.should.be.a('array');
                res.body.data.should.have.property('_id').eql(customer.id);
              done();
            });
          });
       });

       it('it should GET all orders bought by a customer by the given id', (done) => {
         let order = new Order(mockOrder);
         order.save((err, order) => {
           let customer = new Customer(Object.assign({orders: [order._id]}, mockCustomer));
           customer.save((err, customer) => {
               chai.request(server)
               .get(`/api/customers/${customer.id}/orders`)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.data.should.have.property('orders');
                   res.body.data.orders.should.be.a('array');
                   res.body.data.orders.length.should.be.eql(1);
                   res.body.data.orders[0].should.have.property('_id').eql(order.id);
                 done();
               });
             });
           });
        });

        it('it should GET the amount of money paid by a customer by the given id', (done) => {
          let order = new Order(mockOrder);
          order.save((err, order) => {
            let customer = new Customer(Object.assign({orders: [order._id]}, mockCustomer));
            customer.save((err, customer) => {
                chai.request(server)
                .get(`/api/customers/${customer.id}/amount-paid`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.data.should.be.a('array');
                    res.body.data[0].should.have.property('amountPaid');
                    res.body.data[0].should.have.property('amountPaid').eql(400);
                  done();
                });
              });
            });
         });

         it('it should GET all customers that bought a certain item by the given item name', (done) => {
           let order = new Order(mockOrder);
           order.save((err, order) => {
             let customer = new Customer(Object.assign({orders: [order._id]}, mockCustomer));
             customer.save((err, customer) => {
                 chai.request(server)
                 .get(`/api/customers/${order.itemName}/all`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.data.should.be.a('array');
                     res.body.data[0].should.have.property('customers');
                     res.body.data[0].customers.length.should.be.eql(1);
                   done();
                 });
               });
             });
          });

    });

    describe('/PUT/:id customer', () => {
      it('it should UPDATE a customer given the id', (done) => {
        let customer = new Customer(mockCustomer);
        customer.save((err, customer) => {
                chai.request(server)
                .put('/api/customers/' + customer.id)
                .send({customerName: "Qubaish Pro", email: "geek@coding.com"})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.code.should.be.eql(0);
                    res.body.status.should.have.property('message').eql("OK");
                    res.body.data.should.have.property('customerId');
                  done();
                });
          });
      });

      it('it should not Update a Customer without customer name', (done) => {
        let customer = new Customer(mockCustomer);
        customer.save((err, customer) => {
           chai.request(server)
           .put('/api/customers/' + customer.id)
           .send({customerName: "", phone: "+988566766"})
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.status.should.have.property('error');
               res.body.status.error.includes('customerName').should.be.true;
               res.body.status.error.includes('required').should.be.true;
             done();
           });
         });
       });
    });

    describe('/DELETE/:id customer', () => {
      it('it should DELETE a customer given the id', (done) => {
        let customer = new Customer(mockCustomer)
        customer.save((err, customer) => {
                chai.request(server)
                .delete('/api/customers/' + customer.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data').eql('Customer successfully deleted!');
                  done();
                });
          });
      });
    });

});
