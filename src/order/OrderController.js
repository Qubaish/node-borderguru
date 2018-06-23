const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      customerFilters = require('./Filters');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Order = require('./Order');
const Customer = require('../customer/Customer');

// CREATE ORDER
router.post('/', (req, res) => {
    let {customerId = null, ...order} = req.body;
    Order.create(order, async (err, order) => {
      if (err) return res.error(err.message);
      order.createOrUpdateCustomer(customerId);
      res.status(200).success(order);
    });
});

// UPDATE ORDER
router.put('/:id', (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true }, (err, order) => {
        if (err) return res.error("There was a problem updating the order.");
        if(!order) return res.error("Order not found");
        res.status(200).success(order);
    });
});

// RETURNS ALL THE ORDERS
router.get('/', (req, res) => {
    Order.find({}, (err, orders) =>{
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.success(orders);
    });
});

// GET ORDER
router.get('/:id', (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) return res.error(err.message);
        if (!order) return  res.error("No Order found.");
        res.status(200).success(order);
    });
});

// GET ORDERS FOR A GIVEN ADDRESS OR NAME
router.get('/customers/q', customerFilters, (req, res, next) => {
    Order.find({$or: req.filters}, (err, order) => {
        if (err) return res.error(err);
        if (!order) return  res.error("No Order found.");
        res.status(200).success(order);
    });
});

// DELETE ORDER BY A GIVEN ORDER IDENTIFIER
router.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, order) => {
        if (err) return res.error("There was a problem deleting the order.");
        res.status(200).success("Order successfully deleted!");
    });
});

module.exports = router;
