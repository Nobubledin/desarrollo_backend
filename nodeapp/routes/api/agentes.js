const express = require('express');
const router = express.Router();
const Agente = require('../../models/Agente');

// GET /api/agentes
// Devuelve una lista de agentes
router.get('/', async (req, res, next) => {
  try {
    const agentes = await Agente.find();

    res.json({ results: agentes })

  } catch (err) {
    next(err);
  }
});

// GET /api/agentes/(_id)
// Devuelve un agente
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const agente = await Agente.findById(id);

    res.json({ result: agente });
  } catch (err) {
    next(err);
  }
})

module.exports = router;