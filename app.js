var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var auctionRouter = require('./routes/auction');
var auctionPictureRouter = require('./routes/auction_picture');
var socketsRouter = require('./routes/sockets');
var registrationRouter = require('./routes/registration');
var picturesRouter = require('./routes/pictures');
var peopleRouter = require('./routes/people');
var pictureRouter = require('./routes/picture');
var setting_auctionRouter = require('./routes/setting_auction');
var adminRouter = require('./routes/admin');
var entryRouter = require('./routes/entry');

var app = express();

global.currentPicture = 0;

global.timerCommon = 0;
global.timerPicture = 0;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascript', express.static('javascript'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/registration', registrationRouter);
app.use('/auction', auctionRouter);
app.use('/auction/picture', auctionPictureRouter);

app.use('/', entryRouter);
app.use('/admin', adminRouter);
app.use('/admin/pictures', picturesRouter);
app.use('/admin/people', peopleRouter);
app.use('/admin/setting_auction', setting_auctionRouter);
app.use('/admin/picture', pictureRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
