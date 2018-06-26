# NodeJS Order Customers API

* Node version 'v9.11.1'
* Mongoose 'v5.0.1'

# Setting up the app in *development* mode

In the root of the app:
* npm install
* npm start

# For Test Cases

* npm test

# Orders API

* GET /api/orders/customers/q?name=
* GET /api/orders/customers/q?address=
* POST /api/orders {post params}
* PUT /api/orders/:id {post params}
* DELETE /api/orders/:id
* GET /api/orders/items/ordered

# Customers API

* GET /api/customers/:id
* PUT /api/customers/:id
* DELETE /customers/:id
* GET /api/customers/:id/orders
* GET /api/customers/:id/total-amount
* GET /api/customers/:item/all
