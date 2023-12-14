const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

class LoginController {

  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o la contraseña no coincide --> error
      if (!usuario || !(await usuario.comparePassword(password)) ) {
        res.locals.error = req.__('Invalid credentials');
        res.locals.email = email;
        res.render('login');
        return;
      }

      // si existe y la contraseña coincide --> zona privada
      // apuntar en la sesión del usuario, que está autenticado
      req.session.usuarioLogado = usuario._id;
      res.redirect('/privado');

    } catch (err) {
      next(err);
    }

  }

  logout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    })
  }

  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la base de datos
      const usuario = await Usuario.findOne({ email: email });

      // si no lo encuentro o la contraseña no coincide --> error
      if (!usuario || !(await usuario.comparePassword(password)) ) {
        res.json({ error: 'Invalid credentials' });
        return;
      }

      // si existe y la contraseña coincide --> devuelvo un JWT
      const tokenJWT = await jwt.sign({ _id: usuario._id }, 's876ads87dasuytasduytasd', {
        expiresIn: '2h'
      });
      res.json({ jwt: tokenJWT });

    } catch (err) {
      next(err);
    }

  }


}

module.exports = LoginController;