'use strict';

// microservicio de conversión de moneda

const { Responder } = require('cote');

// almacén de datos
const tasas = {
  USD_EUR: 0.94,
  EUR_USD: 1.06,
};

// lógica del servicio

const responder = new Responder({ name: 'servicio de mnoneda' });

responder.on('convertir-moneda', (req, done) => {
  const { cantidad, desde, hacia } = req;

  console.log(Date.now(), 'servicio:', cantidad, desde, hacia);

  // calcular la tasa de cambio
  const tasa = tasas[`${desde}_${hacia}`];

  const resultado = cantidad * tasa;

  done(resultado);
})