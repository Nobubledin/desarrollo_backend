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
      if (!usuario || usuario.password !== password) {
        res.locals.error = req.__('Invalid credentials');
        res.locals.email = email;
        res.render('login');
        return;
      }

      // si existe y la contraseña coincide --> zona privada
      res.redirect('/privado');

    } catch (err) {
      next(err);
    }

  }

}

module.exports = LoginController;