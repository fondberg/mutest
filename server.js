'use strict';

const express = require('express');
const { Client } = require('pg');

// Constants
const PORT = 8011;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  console.log('Got request', JSON.stringify(req.connection.remoteAddress, null, 2));
  console.log('Env', JSON.stringify(process.env, null, 2));
  res.send('Hello world staging Thu 15:27 under development\n' + process.env.DBURL + ' - ' + process.env.PARAMTEST1 + ' - ' + process.env.PARAMTEST2 + '\n');
});


app.get('/pg', (request, response) => {
  const client = new Client({
    connectionString: process.env.DBURL// e.g. postgres://user:password@host:5432/database
  });
  client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
      response.status(503).json(err.stack);
    } else {
      console.log('connected');
    }
  });
  client.query('SELECT NOW()', (err, res) => {
    if (err) throw err
    console.log(res);
    response.status(200).json(res);
    client.end();
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
console.log('DBURL\n' + process.env.DBURL + ' - PARAMTEST1:' + process.env.PARAMTEST1 + '\n');
