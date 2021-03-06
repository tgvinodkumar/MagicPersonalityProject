var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var userRouter     = express.Router();
  var watRouter      = express.Router();
  var youtubeRouter  = express.Router();


  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(express.static(__dirname + '/../../client'));

  app.use('/api/users', userRouter); // use user router for all user request

  app.use('/api/youtube', youtubeRouter);

  // authentication middleware used to decode token and made available on the request
  //app.use('/api/links', helpers.decode);
  app.use('/api/wat', watRouter);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('../users/userRoutes.js')(userRouter);
  require('../wat/watRoutes.js')(watRouter);
  require('../youtube/youTubeRoutes.js')(youtubeRouter);
};
