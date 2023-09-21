var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// definimos una variable de vista que estará disponible
// en todos los render que hagamos
app.locals.title = 'NodeApp';

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // parea el body en formato urlencoded
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/pdfs', express.static(path.join(__dirname, 'd:/pdfs')));

// app.use((req, res, next) => {
//   console.log('Ha llegado una petición a', req.url);
//   next('zzz');
// });

app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // comprobar si es un error de validación
  if (err.array) {
    const errorInfo = err.errors[0]; // err.array({ onlyFirstError: true })[0]
    console.log(errorInfo)
    err.message = `Error en ${errorInfo.location}, parámetro ${errorInfo.path} ${errorInfo.msg}`;
    err.status = 422;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
