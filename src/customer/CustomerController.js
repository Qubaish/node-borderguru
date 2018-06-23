const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const mongoose = require('mongoose');

const Customer = require('./Customer');
const Order = require('../order/Order');


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

router.put('/:id', (req, res) => {
    Customer.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true }, (err, customer) => {
        if (err) return res.error("There was a problem updating the customer.");
        if(!customer) return res.error("Customer not found");
        res.status(200).success(customer);
    });
});

router.delete('/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id, (err, customer) => {
        if (err) return res.error("There was a problem deleting the customer.");
        res.status(200).success("Customer successfully deleted!");
    });
});

router.get('/:id/orders', (req, res) => {
    Customer.findOne({_id: req.params.id}).populate({path: 'orders'}).exec( (err, customer) => {
        if (err) return res.error(err.message);
        if (!customer) return  res.error("No Customer found.");
        res.status(200).success(customer);
    });
});


router.get('/chacha/two/:id', async (req, res) => {
    const cus = await Customer.getCustomer(req.params.id);
    res.send(cus);
});

router.get('/:id/total-amount', (req, res) => {
  let id = [mongoose.Types.ObjectId(req.params.id)];
  Customer.aggregate([
    { "$match": { "_id": { "$in": id} } },
    {"$lookup":{
      "from":"orders",
      "localField":"orders",
      "foreignField":"_id",
      "as":"lookup-data"
    }},
    {"$addFields":{
      "totalAmount":{
        "$sum":"$lookup-data.price"
      }
    }},
    {"$project":{"lookup-data":0, "_id": 0, "orders": 0}}
  ], (err, result)  => {
       if (err) return res.error(err)
       res.status(200).success(result);
   });
});



module.exports = router;
