'use strict';

// esta app necesita un microservicio para hacer cambios de moneda

const { Requester } = require('cote');

const requester = new Requester({ name: 'app' });

const evento = {
  type: 'convertir-moneda',
  cantidad: 100,
  desde: 'USD',
  hacia: 'EUR',
};

setInterval(() => {
  requester.send(evento, resultado => {
    console.log(Date.now(), 'app obtiene resultado:', resultado);
  });
}, 1000);