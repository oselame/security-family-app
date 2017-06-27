/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerTools from 'swagger-tools';

// Import WelcomeController from controllers entry point
import {WelcomeController} from './controllers';

// Create a new express application instance
const app: express.Application = express();

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Swagger Docs
var swaggerTools = require('swagger-tools');

// swaggerRouter configuration
let options = {
    swaggerUi: '/swagger.json',
    controllers: './controllers'
}

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
let swaggerDoc = require('./swagger.json');

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // start the server
    var server = app.listen(3000, function() {
        var host = server.address().address;
        host = (host === '::' ? 'localhost' : host);
        var port = server.address().port;

        console.log('listening at http://%s:%s', host, port);
    });
});

/*

// The port the express app will listen on
const port: number = process.env.PORT || 3000;

// Mount the WelcomeController at the /welcome route
app.use('/welcome', WelcomeController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
*/