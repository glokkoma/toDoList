var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var expressSession = require('express-session');

var indexRouter = require('./routes/index');

var app = express();

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts); // Activar layouts

// Middleware de log personalizado (opcional)
app.use((req, res, next) => {
  console.log(`Nueva peticion en ${req.hostname} a las ${(new Date()).toISOString()} `)
  next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Sesión
app.use(expressSession({
  secret: 'mi-clave-secreta-supersegura',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // false para HTTP (localhost)
}));

app.use('/', indexRouter);
// Nota: Se ha eliminado la ruta '/users' que tenías, ya que no se usa en el objetivo.

// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;