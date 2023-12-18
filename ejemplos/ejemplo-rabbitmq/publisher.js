'use strict';

require('dotenv').config();

const amqplib = require('amqplib');
const EXCHANGE = 'task-request';

main().catch(err => console.log('Hubo un error', err));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  // conectar al broker de RabbitMQ
  const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);

  // crear un canal
  const canal = await connection.createChannel();

  // asegurar que existe un exchange
  await canal.assertExchange(EXCHANGE, 'direct', {
    durable: true // the exchange will survive broker restarts
  })

  let keepSending = true;

  while (true) {
    // publicar mensajes
    const mensaje = {
      tarea: 'enviar un email' + Date.now()
    };

    // verificar si puedo enviar más o tengo que darle un respiro
    if (!keepSending) {
      // esperar a que se drene (vacie) el buffer de escritura del broker
      console.log('Buffer lleno, espero a que se vacie');
      await new Promise(resolve => canal.on('drain', resolve))
    }

    keepSending = canal.publish(EXCHANGE, '*', Buffer.from(JSON.stringify(mensaje)), {
      persistent: true, // the message will survive broker restarts
    });

    console.log('enviado mensaje', mensaje);
    // await sleep(1);
  }

}