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
});

// PUT /api/agentes/(_id)
// Actualiza un agente
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const agenteActualizado = await Agente.findByIdAndUpdate(id, data, { new: true });

    res.json({ result: agenteActualizado });

  } catch (err) {
    next(err);
  }
});

// POST /api/agentes
// Crea un agente
router.post('/', async (req, res, next) => {
  try {
    const agenteData = req.body;

    // creamos una instancia de agente en memoria
    const agente = new Agente(agenteData);

    // la persistimos en la BD
    const agenteGuardado = await agente.save();

    res.json({ result: agenteGuardado });

  } catch (err) {
    next(err);
  }
});

// DELETE /api/agentes/(_id)
// Elimina un agente
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Agente.deleteOne({ _id: id });

    res.json();
  } catch (err) {
    next(err);
  }
})

module.exports = router;