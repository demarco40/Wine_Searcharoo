const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
app.use(express.static("../Contemporary")); //This assumes the folder name this file is inside is named Contemporary. Change is needed.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('./routes/pokemon')); //if pokemon.js is in a different location, change the path to the correct location.

//Uses the port 3000 and sends a message to console.
app.listen(3000, () => {
  console.log('listening on 3000')
})
