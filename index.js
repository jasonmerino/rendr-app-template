var express = require('express'),
    rendr = require('rendr'),
    env = require('./server/lib/env'),
    mw = require('./server/middleware'),
    DataAdapter = require('./server/lib/data_adapter'),
    app;

app = express();

/**
 * Initialize Express middleware stack.
 */
function initMiddleware() {
  app.use(express.compress());
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger());
  app.use(express.bodyParser());

  /**
   * Rendr provides its own instance of Express, for better encapsulation.
   * You could use it directly as your main app, but we find it's more flexible
   * to simply "mount" it as a sub-app onto another Express instance, which is
   * equivalent to just using it as middleware. This flexibility allows you to
   * mount your Rendr app at a certain path, or even host multiple, self-contained
   * Rendr apps in the same codebase with the same Express app.
   */
  app.use(initServer().expressApp);

  /**
   * Error handler goes last.
   */
  app.use(express.errorHandler());
}

/**
 * Initialize our Rendr server.
 *
 * We can pass inject various modules and options here to override
 * default behavior, i.e.:
 * - dataAdapter
 * - errorHandler
 * - appData
 */
function initServer() {
  var options = {
    dataAdapter: new DataAdapter(env.current.api),
    appData: env.current.rendrApp
  };
  return rendr.createServer(app, options);
}

/**
 * Start the Express server.
 */
function start() {
  var port = process.env.PORT || 3030;
  app.listen(port);
  console.log("server pid %s listening on port %s in %s mode",
    process.pid,
    port,
    app.settings.env);
}

/**
 * Here we actually initialize everything and start the Express server.
 */
initMiddleware();
start();
