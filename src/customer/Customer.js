const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  customerName: { type: String, required: true},
  customerAddress: {type: String, required: true},
  email: {type: String},
  phone: {type: Number},
  customerType: {type: String},
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}]
});

CustomerSchema.statics.getCustomer = function(customerId) {
  return this.findById(customerId).exec();
}

CustomerSchema.statics.createCustomer = function(options) {
  return this.create({
    customerName: options.customerName,
    customerAddress: options.customerAddress,
    customerType: "Guest",
    orders: options._id
  });
}

CustomerSchema.statics.addOrder = function(cusId, orderID){
  return this.update({_id: cusId}, {$push: {orders: orderID}});
}

CustomerSchema.statics.deleteOrder = function(cusId, orderID){
  return this.update({_id: cusId}, { $pullAll: {orders: [orderID] } });
}

module.exports = mongoose.model('Customer', CustomerSchema);
