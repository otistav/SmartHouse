var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io')

var getPageControls = require('./routes/getPageControls');
var session = require('express-session');
var index = require('./routes/index');
var users = require('./routes/users');
var signInPage = require('./routes/logIn');
var siteHandlePage = require('./routes/siteHandlePage');
var logOutPage = require('./routes/logOutPage');
var pages = require('./routes/pages');
var icons = require('./routes/icons');
var controls = require('./routes/controls');
var devices = require('./routes/devices');
var pageControls = require('./routes/pageControls');
var deviceTypes = require('./routes/deviceTypes');
var controlTypes = require('./routes/controlTypes');
var HTTPError = require('./Utils/Errors/HTTPError');
var findMe = require('./routes/findMe');



var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use((req, res, next) => {console.log(req.body); next()});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'max',
    saveUninitialized: true,
    resave: false
}));

app.use('/', index);
app.use('/users', users);
app.use('/signin', signInPage);
app.use('/sitehandlepage', siteHandlePage);
app.use('/logoutpage', logOutPage);
app.use('/pages', pages);
app.use('/controls', controls);
app.use('/devices', devices);
app.use('/pageControls', pageControls);
app.use('/deviceTypes', deviceTypes);
app.use('/controlTypes', controlTypes);
app.use('/findMe', findMe);
app.use('/icons', icons);
app.use('/getPageControls', getPageControls);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if (err instanceof HTTPError) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message);
    res.status(err.status);
    res.json(err);
  }
  else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(500);
    res.json(err)
  }

});

module.exports = {app: app, server: server};
