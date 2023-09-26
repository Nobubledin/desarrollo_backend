const mongoose = require('mongoose');

// definir el esquema de los agentes
const agenteSchema = mongoose.Schema({
  name: String,
  age: { type: Number, min: 18, max: 120 }
}, {
  // collection: 'agentes' // para forzar un nombre concreto de colección
});

// Tipos de métodos:
//  - Estático: método que está en el modelo (p.e. Agente.lista())
agenteSchema.statics.lista = function(filtro, skip, limit, sort) {
  const query = Agente.find(filtro); // devuelve un objeto de tipo query que es un thenable
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  return query.exec();
}

// crear el modelo de agente
const Agente = mongoose.model('Agente', agenteSchema);

// exportar el modelo de agente (opcional)
module.exports = Agente;