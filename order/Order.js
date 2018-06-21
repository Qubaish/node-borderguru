const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const Schema = mongoose.Schema;

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

mongoose.model('Order', OrderSchema);
module.exports = mongoose.model('Order');
