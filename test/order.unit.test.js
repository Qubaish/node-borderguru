const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

const Order = require('../order/Order');

describe("Get all Orders", () => {

    it("should return all orders", (done) => {
        let OrderMock = sinon.mock(Order);
        let expectedResult = {status: {code: 1}};
        OrderMock.expects('find').yields(null, expectedResult);
        Order.find( (err, result) => {
            OrderMock.verify();
            OrderMock.restore();
            expect(result.status.code).to.equal(1);
            done();
        });
    });

    it("should return error", (done) => {
           let OrderMock = sinon.mock(Order);
           let expectedResult = {status: {code: 0}};
           OrderMock.expects('find').yields(expectedResult, null);
           Order.find( (err, result) => {
               OrderMock.verify();
               OrderMock.restore();
               expect(err.status.code).to.equal(0);
               done();
           });
    });
})

describe("Get all Orders for a give Customer Name", () => {
  it("should return all orders", (done) => {
      let OrderMock = sinon.mock(Order);
      let expectedResult = {status: {code: 1}};
      OrderMock.expects('find').withArgs({customerName: "Peter Lustng"}).yields(null, expectedResult);
      Order.find( {customerName: "Peter Lustng"}, (err, result) => {
          OrderMock.verify();
          OrderMock.restore();
          expect(result.status.code).to.equal(1);
          done();
      });
  });
})
