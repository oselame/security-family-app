var express = require('express');
var app = express();

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

/*
var apiRouter = express.Router();
app.use('/api/v1', apiRouter);

var PlayersController = require('./controllers/players');
var pc = new PlayersController(apiRouter);

var BoardsController = require('./controllers/boards');
var bc = new BoardsController(apiRouter);

var ScoresController = require('./controllers/scores');
var sc = new ScoresController(apiRouter);
*/

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var apiRouter = express.Router();
app.use('/api', apiRouter);

var apiV1 = express.Router();
apiRouter.use('/v1', apiV1);

var playersApiV1 = express.Router();
apiV1.use('/players', playersApiV1);

var boardsApiV1 = express.Router();
apiV1.use('/leaderboards', boardsApiV1);

var PlayersController = require('./controllers/players');
var pc = new PlayersController(playersApiV1);
var BoardsController = require('./controllers/boards');
var bc = new BoardsController(boardsApiV1);
var ScoresController = require('./controllers/scores');
var sc = new ScoresController(boardsApiV1);


var BoardsService = require('./services/boards');
var b1 = BoardsService.addBoard('Total Score', 1);
var b2 = BoardsService.addBoard('Times Died', 0);

var PlayersService = require('./services/players');
var p1 = PlayersService.addPlayer({ firstName: 'Ben', lastName: 'Sparks', displayName: 'Warspawn' });
var p2 = PlayersService.addPlayer({ firstName: 'Joe', lastName: 'Blow', displayName: 'Joey558' });
var p3 = PlayersService.addPlayer({ firstName: 'Danny', lastName: 'Danger', displayName: 'DD83' });

var ScoresService = require('./services/scores');
ScoresService.addScore(b1.id, p1.id, 3000);
ScoresService.addScore(b1.id, p2.id, 2345);
ScoresService.addScore(b1.id, p3.id, 15238);
ScoresService.addScore(b2.id, p1.id, 33);
ScoresService.addScore(b2.id, p2.id, 7);
ScoresService.addScore(b2.id, p3.id, 67);



app.get('/', function(req, res) {
    res.send('Hello World!');
});




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