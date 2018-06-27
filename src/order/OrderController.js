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
      res.status(200).success({orderId: order._id});
    });
});

// UPDATE ORDER
router.put('/:id', (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true }, (err, order) => {
        if (err) return res.error("There was a problem updating the order.");
        if(!order) return res.error("Order not found");
        res.status(200).success({orderId: order._id});
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
        if(!order) return res.error("No Order Found");
        req.body.customerId && order.deleteOrderFromCustomer(req.body.customerId);
        res.status(200).success("Order successfully deleted!");
    });
});

// GET ALL ITEMS HOW MANY TIME THEY HAVE BEEN ORDERED AND SORT THEM
router.get('/items/top-selling', (req, res, next) => {
  Order.aggregate([
    { $group: { _id: "$itemName", total_ordered: { $sum: 1 } } },
    { $sort: {total_ordered: -1, '_id': 1} }
    ], (err, result) =>{
      if(err) return res.error(err.message)
      res.status(200).success(result);
    });
});

module.exports = router;
