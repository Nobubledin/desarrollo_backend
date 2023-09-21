var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.locals.texto = 'Hola';
  res.locals.nombre = '<script>alert("inyección de código")</script>'

  const ahora = new Date();
  res.locals.esPar = (ahora.getSeconds() % 2) === 0;
  res.locals.segundoActual = ahora.getSeconds();

  res.locals.usuarios = [
    { nombre: 'Smith', edad: 32 },
    { nombre: 'Jones', edad: 27 }
  ]

  res.render('index');
});

module.exports = router;
