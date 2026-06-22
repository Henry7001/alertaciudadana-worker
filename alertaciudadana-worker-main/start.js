require('dotenv').config();
const express = require('express');
const { execSync } = require('child_process');
const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//app.listen(port, () => {
  //console.log(`Server listening on port ${port}`);
  try {
    // Ejecuta el worker
    console.log(`Starting worker...`);
    execSync(`graphile-worker -c ${process.env.DATABASE_URL}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error while starting the worker:', error);
  }
//});
