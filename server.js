const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dataLayer = require('./JS/data.js');
app.use(express.static("../Wine_Searcharoo"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    //this gets called when it first loads
    //Do database stuff to get all information we nee
    //pass it into render
    //console.log(req.query);
    res.render('pages/index');
});

app.get('/search', function(req, res) {
    //this gets called when it first loads
    //var wineJson = req.body['wines'][0];
    //console.log(req.query["wines"]);
    //Do database stuff to get all information we nee
    //pass it into render
    //console.log(req.query);
    res.render('partials/search',{wines: req.query["wines"]});
});

app.get('/modal', function(req, res){
    console.log(req.query);
    //res.render('partials/modal',{wines: req.query["wines"]});
})

app.post('/addToList', function(req,res){
    var listType = req.body['listType'];
    //var wineApiCode = req.body['code'];
    var wineJson = req.body["wines"][0];
    dataLayer.addToDB(wineJson);
    dataLayer.addToList(wineJson['code'],listType);
    //console.log(listToAddTo);
    //console.log(wineJson);
    //make mysql code here using vars from wineJson
});

app.listen(3000, () => {
  console.log('listening on 3000')
})
