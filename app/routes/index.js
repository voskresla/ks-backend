// routes/index.js

const orderRoutes = require('./order_routes');

module.exports = function (app,db,passport) {
  orderRoutes(app,db,passport);
}
