const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    //Do database stuff to get all information we need
    //pass it into render
    res.render('pages/index');
});


 app.use(express.static("../Wine_Searcharoo"));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(require('./routes/backend_wine'));

app.listen(3000, () => {
  console.log('listening on 3000')
})
