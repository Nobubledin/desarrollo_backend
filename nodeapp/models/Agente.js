const mongoose = require('mongoose');

// definir el esquema de los agentes
const agenteSchema = mongoose.Schema({
  name: String,
  age: Number
});

// crear el modelo de agente
const Agente = mongoose.model('Agente', agenteSchema);

// exportar el modelo de agente (opcional)
module.exports = Agente;