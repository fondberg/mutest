'use strict';

const express = require('express');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  console.log('Got request', JSON.stringify(req.connection.remoteAddress, null, 2));
  console.log('Env', JSON.stringify(process.env, null, 2));
  res.send('Hello world Mon 12:51 \n' + process.env.DBURL + ' - ' + process.env.PARAMTEST1 + ' - ' + process.env.PARAMTEST2 + '\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
console.log('DBURL\n' + process.env.DBURL + ' - PARAMTEST1:' + process.env.PARAMTEST1 + '\n');
