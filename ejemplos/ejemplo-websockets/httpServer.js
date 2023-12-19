'use strict';

const http = require('node:http');
const path = require('node:path');
const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Servidor HTTP arrancado en http://localhost:3000');
});