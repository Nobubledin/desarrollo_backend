'use strict';

require('dotenv').config();

const amqplib = require('amqplib');

const QUEUE = 'tasks';

main().catch(err => console.log('Hubo un error', err));

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  // conectar al broker de RabbitMQ
  const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);

  // crear un canal
  const canal = await connection.createChannel();

  // asegurar que existe la cola para recibir mensajes
  await canal.assertQueue(QUEUE, {
    durable: true, // the queue will survive broker restarts
  });

  canal.prefetch(100); // pending ack's

  canal.consume(QUEUE, async mensaje => {
    const payload = mensaje.content.toString();
    console.log(payload);
    await sleep(150);
    canal.ack(mensaje);
  });

}