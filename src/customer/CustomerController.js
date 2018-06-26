const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const mongoose = require('mongoose');

const Customer = require('./Customer');
const Order = require('../order/Order');

// GET ALL CUSTOMERS
router.get('/', (req, res) => {
    Customer.find({}, (err, customers) =>{
        if (err) return res.status(500).send("There was a problem finding the customers.");
        res.success(customers);
    });
});

// GET CUSTOMER
router.get('/:id', async (req, res) => {
    try{
      var customer = await Customer.getCustomer(req.params.id);
    } catch(e) {
      return res.error(e.error.message);
    }
    if (!customer) return res.error("No Customer found.");
    res.status(200).success(customer);
});

//UPDATE CUSTOMER
router.put('/:id', (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true }, (err, customer) => {
        if (err) return res.error(err.message);
        if(!customer) return res.error("Customer not found");
        res.status(200).success(customer);
    });
});

// DELETE CUSTOMER
router.delete('/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, customer) => {
        if (err) return res.error("There was a problem deleting the customer.");
        res.status(200).success("Customer successfully deleted!");
    });
});

// GET ALL ORDERS BOUGHT BY CUSTOMER
router.get('/:id/orders', (req, res) => {
    Customer.findOne({_id: req.params.id}).populate({path: 'orders'}).exec( (err, customer) => {
        if (err) return res.error(err.message);
        if (!customer) return  res.error("No Customer found.");
        res.status(200).success(customer);
    });
});

// GET AMOUNT MONEY PAID BY CUSTOMER
router.get('/:id/total-amount', (req, res) => {
  let id = [mongoose.Types.ObjectId(req.params.id)];
  Customer.aggregate([
    { "$match": { "_id": { "$in": id} } },
    {"$lookup":{
      "from":"orders",
      "localField":"orders",
      "foreignField":"_id",
      "as":"order"
    }},
    {"$addFields":{
      "totalAmount":{
        "$sum":"$order.price"
      }
    }},
    {"$project":{"order":0, "_id": 0, "orders": 0, "__v": 0}}
  ], (err, result)  => {
       if (err) return res.error(err)
       res.status(200).success(result);
   });
});

// GET ALL CUSTOMERS BOUGHT CERTAIN ITEM
router.get('/:item/all', (req, res) => {
  Customer.aggregate([
    {"$lookup":{
      "from":"orders",
      "localField":"orders",
      "foreignField":"_id",
      "as":"order"
    }},
    {"$unwind":"$orders"},
    {"$match":{
      "order.itemName" : req.params.item
    }},
    {"$group": {_id: null, customers: {$addToSet: {customerName: "$customerName", customerAddress: "$customerAddress"}}}},
    {"$project":{"order":0, "_id": 0, "orders": 0}}
  ], (err, result)  => {
       if (err) return res.error(err)
       res.status(200).success(result);
   });
})

module.exports = router;
