const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

const Order = require('../src/order/Order');
let mockOrder = {customerName: 'Qubaish', customerAddress: 'Dubai hala Dubai', itemName: 'Macbook', price: 400, currency: 'EUR' };

describe("Get all Orders", () => {

    it("should return all orders", (done) => {
        let OrderMock = sinon.mock(Order);
        let expectedResult = {status: {code: 0}};
        OrderMock.expects('find').yields(null, expectedResult);
        Order.find( (err, result) => {
            OrderMock.verify();
            OrderMock.restore();
            expect(result.status.code).to.equal(0);
            done();
        });
    });

    it("should return error", (done) => {
           let OrderMock = sinon.mock(Order);
           let expectedResult = {status: {code: 1}};
           OrderMock.expects('find').yields(expectedResult, null);
           Order.find( (err, result) => {
               OrderMock.verify();
               OrderMock.restore();
               expect(err.status.code).to.equal(1);
               done();
           });
    });
})

describe("Get all Orders for a give Customer Name", () => {
  it("should return all orders", (done) => {
      let OrderMock = sinon.mock(Order);
      let expectedResult = {status: {code: 0}};
      OrderMock.expects('find').withArgs({customerName: "Peter Lustng"}).yields(null, expectedResult);
      Order.find( {customerName: "Peter Lustng"}, (err, result) => {
          OrderMock.verify();
          OrderMock.restore();
          expect(result.status.code).to.equal(0);
          done();
      });
  });
})

describe("Get all Orders for a give Customer Address", () => {
  it("should return all orders", (done) => {
      let OrderMock = sinon.mock(Order);
      let expectedResult = {status: {code: 0}};
      OrderMock.expects('find').withArgs({customerAddress: "DSO Dubai"}).yields(null, expectedResult);
      Order.find( {customerAddress: "DSO Dubai"}, (err, result) => {
          OrderMock.verify();
          OrderMock.restore();
          expect(result.status.code).to.equal(0);
          done();
      });
  });
});

describe("Post a new order", () => {
  it("should create new order", (done) => {
      let OrderMock = sinon.mock(new Order(mockOrder));
      let order = OrderMock.object;
      let expectedResult = {status: {code: 0}};
      OrderMock.expects('save').yields(null, expectedResult);
      order.save((err, result) => {
          OrderMock.verify();
          OrderMock.restore();
          expect(result.status.code).to.equal(0);
          done();
    });
  });

  it("should return error, if post not saved", (done) => {
      let OrderMock = sinon.mock(new Order(mockOrder));
      let order = OrderMock.object;
      let expectedResult = {status: {code: 1}};
      OrderMock.expects('save').yields(expectedResult, null);
      order.save((err, result) => {
          OrderMock.verify();
          OrderMock.restore();
          expect(err.status.code).to.equal(1);
          done();
      });
  });

});

describe("Update a new order by id", () => {
    it("should updated a order by id", (done) => {
      var OrderMock = sinon.mock(new Order(mockOrder));
      var order = OrderMock.object;
      var expectedResult = {status: {code: 0}};
      OrderMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
      order.save({_id: 12345}, (err, result) => {
        OrderMock.verify();
        OrderMock.restore();
        expect(result.status.code).to.eql(0)
        done();
      });
    });

    it("should return error if update action is failed", (done) => {
      var OrderMock = sinon.mock(new Order(mockOrder));
      var order = OrderMock.object;
      var expectedResult = {status: {code: 1}};
      OrderMock.expects('save').withArgs({_id: 123}).yields(expectedResult, null);
      order.save({_id: 123}, (err, result) => {
        OrderMock.verify();
        OrderMock.restore();
        expect(err.status.code).to.eql(1);
        done();
      });
    });
});

describe("Delete a order by id", () => {
    it("should delete a order by id", (done) => {
      var OrderMock = sinon.mock(Order);
      var expectedResult = {status: {code: 0}};
      OrderMock.expects('remove').withArgs({_id: 123}).yields(null, expectedResult);
      Order.remove({_id: 123}, (err, result) => {
        OrderMock.verify();
        OrderMock.restore();
        expect(result.status.code).to.eql(0)
        done();
      });
    });

    it("should return error if delete action is failed", (done) => {
      var OrderMock = sinon.mock(Order);
      var expectedResult = {status: {code: 1}};
      OrderMock.expects('remove').withArgs({_id: 123}).yields(expectedResult, null);
      Order.remove({_id: 123}, (err, result) => {
        OrderMock.verify();
        OrderMock.restore();
        expect(err.status.code).to.eql(1)
        done();
      });
    });
});
