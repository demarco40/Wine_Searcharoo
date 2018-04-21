const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dataLayer = require('./JS/data.js');
app.use(express.static("../Wine_Searcharoo"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    //Do database stuff to get all information we need
    //pass it into render
    //console.log(req.query);
    res.render('pages/index');
});

app.post('/addToWineTable', function(req,res){
    //all wine info to be added to table
    var wineJson = req.body['wines'][0];
    //call datalayer to do stuff
});

app.post('/addToList', function(req,res){
    var listToAddTo = req.body['listType'];
    var wineJson = req.body['wines'][0];
    console.log(listToAddTo);
    console.log(wineJson);
    //make mysql code here using vars from wineJson
});

app.listen(3000, () => {
  console.log('listening on 3000')
})
