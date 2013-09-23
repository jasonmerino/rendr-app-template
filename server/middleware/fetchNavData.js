// server/middleware/fetchNavData.js
// var myService = require('path/to/myService');

module.exports = function() {
  return function(req, res, next) {
    // You can always access the `App` instance from the `req` on the server.
    var app = req.rendrApp;

    // logs undefined
    console.log('The app: ', app);

    next();
    // Fetch the data
    // myService.fetchNavData(function(err, navData) {
    //   if (err) return next(err);
    //   app.set('navData', navData);
    //   next();
    // });
  };
};