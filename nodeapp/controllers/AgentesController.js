const Agente = require('../models/Agente');

class AgentesController {
  new(req, res, next) {
    res.render('agentes-new');
  }

  async postNewAgent(req, res, next) {
    try {
      const usuarioId = req.session.usuarioLogado;
      const { name, age } = req.body;

      const agente = new Agente({
        name,
        age,
        owner: usuarioId
      });
      await agente.save();

      res.redirect('/privado');

    } catch (error) {
      next(error);
    }
  }
}

module.exports = AgentesController;