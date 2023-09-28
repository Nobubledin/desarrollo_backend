'use strict';

const { readFile, writeFile } = require('node:fs/promises');
const csvParser = require('papaparse');
const { MongoClient } = require('mongodb');

const inputFile = './test.csv';
const outputFile = './test_out.csv';
const mongoUrl = 'mongodb://127.0.0.1';

const client = new MongoClient(mongoUrl);

main()
  .catch(err => console.log('Hubo un error', err))
  .finally(() => client.close() )

async function main() {

  // conectar a la base de datos
  await client.connect();
  console.log('Conectado a MongoDB');
  const db = client.db('cursonode');
  const collection = db.collection('agentes');

  // leer fichero csv
  const fileData = await readFile(inputFile, 'utf-8');
  const { data: rows } = csvParser.parse(fileData, {
    delimiter: ',',
    header: true,
    dynamicTyping: true
  });

  for (const [index, row] of rows.entries()) {

    // buscamnos el agente en la base de datos
    const agente = await collection.findOne({ name: row.name });

    console.log('Document', index, row.name, '=>',
      agente ? agente._id : 'Not found!'
    );

    // si lo encuentro actualizo la fila
    if (agente) {
      row.age = agente.age;
      row._id = agente._id;
    }

  }


  const outputData = csvParser.unparse(rows, {
    header: true
  });

  await writeFile(outputFile, outputData, 'utf-8');

  console.log('Done 🚀');

}