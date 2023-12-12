class PrivadoController {
  index(req, res, next) {

    // si el cliente que hace la petición, no tiene en su sesión la variable usuarioLogado
    // le mandamos al login porque no le conocemos
    if (!req.session.usuarioLogado) {
      res.redirect('/login');
      return;
    }

    res.render('privado');
  }
}

module.exports = PrivadoController;