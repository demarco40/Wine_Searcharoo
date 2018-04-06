const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(express.static("../Wine_Searcharoo")); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('./routes/backend_wine'));

app.listen(3000, () => {
  console.log('listening on 3000')
})
