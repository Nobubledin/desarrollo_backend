const express = require('express');
const router = express.Router();
const Agente = require('../../models/Agente');

router.get('/', async (req, res, next) => {
  try {
    const agentes = await Agente.find();

    res.json({ results: agentes })

  } catch (err) {
    next(err);
  }
});

module.exports = router;