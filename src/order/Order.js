const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;

const Customer = require('../customer/Customer');

const currencyValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 3],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  validate({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'Name should contain alpha-numeric characters only',
  }),
]

const OrderSchema = new Schema({
  customerName: { type: String, required: true},
  customerAddress: {type: String, required: true},
  itemName: {type: String, required: true},
  price: {type: Number, required:true},
  currency: { type: String, required: true, validate: currencyValidator, uppercase: true }
});

OrderSchema.methods.createOrUpdateCustomer = async function(cusId){
  let order = this;
  if(cusId){
    await Customer.addOrder(cusId, order._id);
  }else{
    await Customer.createCustomer(order);
  }
}
//// After implementing customer design //////
// OrderSchema.post('save', async function(order, next) {
  // if(order.customerId){
  //   const cus = await Customer.addOrder(order._id);
  // }else{
  //   await Customer.saveCustomer(order);
  // }
  // next();
// });

module.exports = mongoose.model('Order', OrderSchema);
