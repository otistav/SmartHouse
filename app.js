var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io');
var redux = require('./serverRedux');
var getState = require('./routes/getState');

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
var socket = require('./routes/socket');
var rules = require('./routes/rules');

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
io.on('connection', function (socket) {
    socket.on('redux', (data) => {
      if (data.storeReq === true) {
        io.sockets.emit('redux', redux.getState())
      }
      else {
        console.log(data.payload)
        redux.dispatchActions(data.id, data.item, data.event, data.payload).then(() => {
          console.log(redux.getState())
        });
        socket.on('device', (data) => {
          console.log('this is payload',data.payload);
          redux.dispatchActionFromDevice(data)
        })
      }
    });

    redux.subscribe((state) =>
    {

      io.sockets.emit('redux', state);
    });

    redux.subscribeDeviceChanges((id, change) => {
      console.log("this is id and changes", id, change);
      io.sockets.emit('device', {id: id, change: change})
    })


});

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
app.use('/socket', socket);
app.use('/icons', icons);
app.use('/getPageControls', getPageControls);
app.use('/getState', getState);
app.use('/rules', rules);

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
