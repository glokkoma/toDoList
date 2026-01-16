var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth');
var Database = require('../data/database');
const UsuarioDAO = require("../data/usuario-dao");
const TareaDAO = require('../data/tarea-dao');

// Inicializar DB
var db = Database.getInstance("db.sqlite");
var dao = new UsuarioDAO(db);
var datoTareas = new TareaDAO(db);

// Home
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Login
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

router.post('/login', function(req, res, next) {
  const user = dao.findUserByEmail(req.body.name);
  if(user && req.body.password === user.password){
    req.session.user = { email: user.email, id: user.id };
    res.redirect("/admin")
  } else {
    res.render('index', { title: 'Error de login' });
  }
});

// Admin (Listado)
router.get('/admin', authMiddleware, function(req, res, next) {
  let salida = datoTareas.findTareasByUserId(req.session.user.id)
  res.render('admin', { user: req.session.user, layout: 'layout-admin', tareas: salida });
});

// Logout
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

// Insertar Tarea
router.post("/tareas/insertar", authMiddleware, function(req, res, next) {
  // Guardamos título y descripción
  datoTareas.saveTarea(req.session.user.id, req.body.titulo, req.body.descripcion);
  res.redirect("/admin");
});

module.exports = router;