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

* 1) GET http://localhost:3000/api/orders/customers/q?name=
* 2) GET http://localhost:3000/api/orders/customers/q?address=
* 3) POST http://localhost:3000/api/orders {post params}
* 4) PUT http://localhost:3000/api/orders/:id {post params}
* 5) DELETE  http://localhost:3000/api/orders/:id
* 6) GET http://localhost:3000/api/orders/items/ordered

# Customers API

1) GET http://localhost:3000/api/customers/:id
2) PUT http://localhost:3000/api/customers/:id
3) DELETE http://localhost:3000/api/customers/:id
4) GET http://localhost:3000/api/customers/:id/orders
5) GET http://localhost:3000/api/customers/:id/total-amount
6) GET http://localhost:3000/api/customers/:item/all