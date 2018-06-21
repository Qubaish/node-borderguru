const express = require('express');
const app = express();
const db = require('./db');

const OrderController = require('./order/OrderController');

app.get('/', (req, res) => {
  res.send("Welcome to border guru api")
});

app.use('/orders', OrderController);


app.response.error = function error(message) {
    this.json({
        status: {
            code: 1,
            error: message
        }
    });
};

app.response.success = function success(content) {
    this.json({
        status: {
            code: 0,
            message: "OK"
        },
        data: content
    });
};

module.exports = app;
