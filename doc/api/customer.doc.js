/**
 * @apiDefine SuccessParams
 * @apiSuccess {Object} status Show status of the api.
 * @apiSuccess {Number} status.code 0/1 0 for success and 1 for error.
 * @apiSuccess {String} status.message Example "ok".
 */

 /**
  * @apiDefine ErrorResponse
  * @apiError (Error Response) {Object} status Show status of the api.
  * @apiError (Error Response) {Number} status.code 0/1 0 for success and 1 for error.
  * @apiError (Error Response) {String} status.error Custom Errors/ Mongoose Errors etc.
*/


/**
 * @apiDefine OrderParams
 * @apiSuccess {Object[]} data.orders Order Array.
 * @apiSuccess {String} orders.customerName Customer Name.
 * @apiSuccess {String} orders.customerAddress Customer Address.
 * @apiSuccess {String} orders.itemName Order Item Name.
 * @apiSuccess {String} orders.Price Order Price.
 * @apiSuccess {Number} orders.currency Price Currency.
 */

/**
 * @api {get} /api/customers/:id Get Customer information
 * @apiName GetCustomer
 * @apiGroup Customer
 *
 * @apiParam {Number} id Customer unique ID.
 * @apiUse SuccessParams
 * @apiSuccess {Object} data Customer response.
 * @apiSuccess {String[]} data.orders Uniquer Order Id Array.
 * @apiSuccess {String} data.customerName Customer Name.
 * @apiSuccess {String} data.customerAddress Customer Address.
 * @apiSuccess {Number} data.customerType Customer Type.
 * @apiSuccess {Number} data.email Customer Email.
 * @apiSuccess {Number} data.phone Customer phone number.
 * @apiUse ErrorResponse
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "status": {
 *      "code": 0,
 *      "message": "OK"
 *  },
 *  "data":
 *      {
 *          "_id": "5b300155287c486cd8d0872b",
 *          "customerName": "Ted Justice",
 *          "customerAddress": "Lagerstrasse 11",
 *          "phone": 989343243
 *          "email": qbhatti143@gmail.com
 *           "orders": [
 *              "5b2eca5ca3c1c315767f4280"
 *          ]
 *          "__v": 0
 *      }
 */

 /**
  * @api {put} /api/customers/:id Update a Customer
  * @apiName UpdateCustomer
  * @apiGroup Customer
  *
  * @apiDescription This function has same errors like POST /customer
  *
  * @apiParam {id} id Customer unique ID Required.
  * @apiParam {String} customerName Customer Name.
  * @apiParam {String} customerAddress Customer Address.
  * @apiParam {String} customerType Type of Customer.
  * @apiParam {Number} phone Order Price.
  * @apiParam {String} email Price Currency.
  *
  * @apiUse SuccessParams
  * @apiSuccess {Object} data Customer Response.
  * @apiSuccess {String} data.customerId Customer Unique ID.
  * @apiUse ErrorResponse
  * @apiSuccessExample {json} Success-Response:
  *{
  * "status": {
  *      "code": 0,
  *     "message": "OK"
  * },
  * "data": {
  *     "customerId": "5b32c79221db791a541c908a"
  *  }
  *}
 */

 /**
  * @api {delete} /api/customers/:id Delete a Customer
  * @apiName DeleteCustomer
  * @apiGroup Customer
  *
  * @apiParam {id} id Customer unique ID.
  * @apiUse SuccessParams
  * @apiSuccess {String} data Customer with Success Message.
  * @apiUse ErrorResponse
  * @apiSuccessExample {json} Success-Response:
  * {
  *  "status": {
  *     "code": 0,
  *     "message": "OK"
  *    },
  *  "data": "Customer successfully deleted!"
  *  }
  *
 */

 /**
  * @api {get} /api/customers/:id/orders Get all orders bought by a customer
  * @apiName GetCustomerOrders
  * @apiGroup Customer
  *
  * @apiParam {Number} id Customer unique ID.
  * @apiUse SuccessParams
  * @apiSuccess {Object} data Object.
  * @apiSuccess {Object[]} data.orders Order Array.
  * @apiSuccess {String} data.orders.customerName Customer Name.
  * @apiSuccess {String} data.orders.customerAddress Customer Address.
  * @apiSuccess {String} data.orders.itemName Order Item Name.
  * @apiSuccess {String} data.orders.Price Order Price.
  * @apiSuccess {Number} data.orders.currency Price Currency.
  * @apiSuccessExample {json} Success-Response:
  *{
  *  "status": {
  *      "code": 0,
  *      "message": "OK"
  *  },
  *  "data":
  *      {
  *          "_id": "5b300155287c486cd8d0872b",
  *          "customerName": "Ted Justice",
  *          "customerAddress": "Lagerstrasse 11",
  *          "phone": 989343243,
  *          "email": qbhatti143@gmail.com,
  *           "orders": [
  *            {
  *               "_id": "5b300155287c486cd8d0872b",
  *               "customerName": "Ted Justice",
  *               "currency": "EUR",
  *               "price": 270,
  *               "customerAddress": "Lagerstrasse 11",
  *               "itemName": "Bat",
  *               "__v": 0
  *             }
  *          ]
  *      }
*/

/**
 * @api {get} /api/customers/:id/amount-paid Get amount paid by customer
 * @apiName GetAmoutPaid
 * @apiGroup Customer
 *
 * @apiParam {Number} id Customer unique ID Required.
 * @apiUse SuccessParams
 * @apiSuccess {Object[]} data Object.
 * @apiSuccess {Number} data.amountPaid Customer Name.
 * @apiParam {String} data.customerName Customer Name.
 * @apiParam {String} data.customerAddress Customer Address.
 * @apiParam {String} data.customerType Type of Customer.
 * @apiParam {Number} data.phone Order Price.
 * @apiParam {String} data.email Price Currency.
 * @apiSuccessExample {json} Success-Response:
 *{
 *  "status": {
 *      "code": 0,
 *      "message": "OK"
 *  },
 *  "data":[
 *      {
 *          "_id": "5b300155287c486cd8d0872b",
 *          "customerName": "Ted Justice",
 *          "customerAddress": "Lagerstrasse 11",
 *          "phone": 989343243
 *          "email": qbhatti143@gmail.com,
 *          "amountPaid": 860
 *          "__v": 0
 *      }
 *    ]
*/

/**
 * @api {get} /api/customers/:item/all Get all customers that bought a certain item
 * @apiName GetCustomersItems
 * @apiGroup Customer
 *
 * @apiParam {String} item Order item name Required.
 * @apiUse SuccessParams
 * @apiSuccess {Object} data Object.
 * @apiSuccess {Object[]} data.customers Customer Array.
 * @apiSuccess {String} data.customers.customerName Customer Name.
 * @apiSuccess {String} data.customers customerAddress Customer Address.
 * @apiSuccessExample {json} Success-R
 * {
 *   "status": {
 *
 *       "code": 0,
 *       "message": "OK"
 *     },
 *   "data": [
 *       {
 *           "customers": [
 *               {
 *                   "customerName": "Hello",
 *                   "customerAddress": "hala dubai"
 *               }
 *           ]
 *       }
 *   ]
 *}

*/
