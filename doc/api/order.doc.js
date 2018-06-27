
/**
 * @apiDefine OrderParams
 * @apiSuccess {Object[]} status Show status of the api.
 * @apiSuccess {Number} status.code 0/1 0 for success and 1 for error.
 * @apiSuccess {String} status.message Example "ok".
 * @apiSuccess {Object[]} data Order response.
 * @apiSuccess {String} data.customerName Customer Name.
 * @apiSuccess {String} data.customerAddress Customer Address.
 * @apiSuccess {String} data.itemName Order Item Name.
 * @apiSuccess {String} data.Price Order Price.
 * @apiSuccess {Number} data.currency Price Currency.
 */

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
 * @api {get} /api/orders/:id Get Order information
 * @apiName GetOrder
 * @apiGroup Order
 *
 * @apiParam {Number} id Order unique ID.
 * @apiUse SuccessParams
 * @apiSuccess {Object} data Order response.
 * @apiSuccess {String} data.customerName Customer Name.
 * @apiSuccess {String} data.customerAddress Customer Address.
 * @apiSuccess {String} data.itemName Order Item Name.
 * @apiSuccess {String} data.Price Order Price.
 * @apiSuccess {Number} data.currency Price Currency.
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
 *          "currency": "EUR",
 *          "price": 270,
 *          "customerAddress": "Lagerstrasse 11",
 *          "itemName": "Bat",
 *          "__v": 0
 *      }
 */

 /**
  * @api {get} /api/orders/customers/q Get All Orders from a given Customer Name or Address
  * @apiName GetAlLOrders
  * @apiGroup Order
  *
  * @apiParam {String} name A Customer name
  * @apiParam {String} address A Customer address
  * @apiUse OrderParams
  * @apiUse ErrorResponse
  * @apiSuccessExample {json} Success-Response:
  *{
  *  "status": {
  *      "code": 0,
  *      "message": "OK"
  *  },
  *  "data": [
  *      {
  *          "_id": "5b300155287c486cd8d0872b",
  *          "customerName": "Ted Justice",
  *          "currency": "EUR",
  *          "price": 270,
  *          "customerAddress": "Lagerstrasse 11",
  *          "itemName": "Bat",
  *          "__v": 0
  *      }
  *  ]
  */

  /**
   * @api {post} /api/orders Create a Order
   * @apiName CreateOrder
   * @apiGroup Order
   *
   * @apiDescription This function has same errors like POST /order
   *
   * @apiParam {String} customerId Customer ID Optional.
   * @apiParam {String} customerName Customer Name Required.
   * @apiParam {String} customerAddress Customer Address Required.
   * @apiParam {String} itemName Order Item Name Required.
   * @apiParam {String} Price Order Price Required and Integer.
   * @apiParam {Number} currency Price Currency Required.
   * @apiUse SuccessParams
   * @apiSuccess {Object} data Order Response.
   * @apiSuccess {String} data.orderId Order Unique ID.
   * @apiUse ErrorResponse
   * @apiSuccessExample {json} Success-Response:
   *{
   * "status": {
   *      "code": 0,
   *     "message": "OK"
   * },
   * "data": {
   *     "orderId": "5b32c79221db791a541c908a"
   *  }
   *}
   *
*/

  /**
   * @api {put} /api/orders/:id Update a Order
   * @apiName UpdateOrder
   * @apiGroup Order
   *
   * @apiDescription This function has same errors like POST /order
   *
   * @apiParam {id} id Order unique ID.
   * @apiParam {String} customerName Customer Name.
   * @apiParam {String} customerAddress Customer Address.
   * @apiParam {String} itemName Order Item Name.
   * @apiParam {String} Price Order Price.
   * @apiParam {Number} currency Price Currency.
   *
   * @apiUse SuccessParams
   * @apiSuccess {Object} data Order Response.
   * @apiSuccess {String} data.orderId Order Unique ID.
   * @apiUse ErrorResponse
   * @apiSuccessExample {json} Success-Response:
   *{
   * "status": {
   *      "code": 0,
   *     "message": "OK"
   * },
   * "data": {
   *     "orderId": "5b32c79221db791a541c908a"
   *  }
   *}
  */

  /**
   * @api {delete} /api/orders/:id Delete a Order
   * @apiName DeleteOrder
   * @apiGroup Order
   *
   * @apiParam {id} id Order unique ID.
   * @apiUse SuccessParams
   * @apiSuccess {String} data Order with Success Message.
   * @apiUse ErrorResponse
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "status": {
   *     "code": 0,
   *     "message": "OK"
   *    },
   *  "data": "Order successfully deleted!"
   *  }
   *
  */

  /**
   * @api {get} /api/orders/items/top-selling Get All top selling items
   * @apiName ItemsTopSelling
   * @apiGroup Order
   * @apiUse SuccessParams
   * @apiSuccess {Object[]} data List of Items.
   * @apiSuccess {String} data._id Item Name.
   * @apiSuccess {Number} data.total_ordered How many time item ordered.
   * @apiUse ErrorResponse
   * @apiSuccessExample {json} Success-Response:
   * {
   *  "status": {
   *     "code": 0,
   *     "message": "OK"
   *    },
   * data": [
   *    {
   *          "_id": "Bat",
   *          "total_ordered": 10
   *      },
   *   ]
   *
   *
  */
