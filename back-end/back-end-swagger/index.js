var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql');
var connection  = require('express-myconnection');
 
// parse application/json 
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(
   connection(mysql,{
     host: 'localhost',
     user: 'root',
     password : 'root',
     port : 3306, 
     database:'securitydb'
   },'request')
);


var apiRouter = express.Router();
app.use('/api', apiRouter);

var apiV1 = express.Router();
apiRouter.use('/v1', apiV1);

var locationApiV1 = express.Router();
apiV1.use('/location', locationApiV1);

var syncApiV1 = express.Router();
apiV1.use('/sync', syncApiV1);

var memberApiV1 = express.Router();
apiV1.use('/member', memberApiV1);

var LocationController = require('./controllers/location-controller');
var locationController = new LocationController(locationApiV1);

var SyncController = require('./controllers/sync-controller');
var syncController = new SyncController(syncApiV1);

var MemberController = require('./controllers/member-controller');
var memberController = new MemberController(memberApiV1);

app.get('/', function(req, res) {
    res.send('Hello World!');
});

// start the server
var server = app.listen(3000, function() {
    var host = server.address().address;
    host = (host === '::' ? 'localhost' : host);
    var port = server.address().port;

    console.log('listening at http://%s:%s', host, port);
});

/*
// Swagger Docs
var swaggerTools = require('swagger-tools');
// swaggerRouter configuration
var options = {
    swaggerUi: '/swagger.json',
    controllers: './controllers'
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var swaggerDoc = require('./swagger.json');

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
*/