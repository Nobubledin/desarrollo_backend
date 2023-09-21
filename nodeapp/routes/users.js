var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  const usuarios = [
    { nombre: 'Smith', edad: 36 },
    { nombre: 'Brown', edad: 44 }
  ];

  const filtroName = req.query.name;

  if (filtroName) {
    res.json(usuarios.filter(usuario => usuario.nombre === filtroName))
  } else {
    res.json(usuarios);
  }

});

// POST /users (body)
router.post('/', (req, res, next) => {
  console.log(req.body);
  res.send('recibido');
});

module.exports = router;
