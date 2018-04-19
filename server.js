const express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(express.static("../Wine_Searcharoo"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', function(req, res) {
    //Do database stuff to get all information we need
    //pass it into render
    console.log(req.query);
    res.render('pages/index');
});

app.post('/addToDb', function(req,res){
    var wineJson = req.body['wines'][0];

    //make mysql code here
    //console.log(wineJson.name);
});

app.listen(3000, () => {
  console.log('listening on 3000')
})
