const express = require('express');
var bodyParser = require('body-parser');
var app = express();
var dataLayer = require('./JS/data.js');
app.use(express.static("../Wine_Searcharoo"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    //this runs initally and makes the index starting page
    res.render('pages/index');
});

app.get('/search', function(req, res) {
    //this runs when sombody makes a search.
    //It will generate the return html then send it back to put on the page
    res.render('partials/search',{wines: req.query["wines"]}, function(err,html){
        res.send(JSON.stringify(html));
    });
});

app.get('/modal', function(req, res){
    //this runs when somebody presses the more info tab
    //It will generate the modal then return it to put on the page
    res.render('partials/modal',{wine: req.query["wines"]},function(err,html){
        res.send(JSON.stringify(html));
    });
});

app.get('/favorites', function(req, res){
    //this runs when somebody presses the more info tab
    //It will generate the modal then return it to put on the page
    //data being passed in needs to be a select
    dataLayer.select("SELECT * FROM wine WHERE ?",{favorite:1}).then(function(result){
        //use this result to make json objects and pass them in
        res.render('partials/favorites',{wines: result},function(err,html){
            res.send(JSON.stringify(html));
        });
    });

});

app.get('/list', function(req, res){
    //this runs when somebody presses the more info tab
    searchJson = (req.query['listType'] == 'wish') ? ({wish_list:1}) : ({inventory_list:1});
    //It will generate the modal then return it to put on the page
    //data being passed in needs to be a select
    dataLayer.select("SELECT wine_ID FROM list WHERE ?",searchJson).then(function(result){
        //use this result to make json objects and pass them in
        idArray = Array();
        queryString = "SELECT * FROM wine WHERE wineID in (";
        for (var i = 0; i < result.length; i++) {
            idArray.push(result[i]['wine_ID']);
            queryString += "?,";
        }
        queryString = queryString.slice(0,-1);
        queryString += ")";
        dataLayer.select(queryString, idArray).then(function(wineJson){
            res.render('partials/list',{wines: wineJson, listType: req.query['listType']},function(err,html){
                res.send(JSON.stringify(html));
            });
        });
    });

});

app.post('/addToList', function(req,res){
    //get the list type from passed in json
    var listType = req.body['listType'];
    //get all the wine info
    var wineJson = req.body["wines"][0];
    //first add it to the database. If it is already there nothing happens
    dataLayer.addToDB(wineJson).then(function(result){
        //add it to the list
        dataLayer.addToList(wineJson['code'],listType);
    });
});

app.post('/addToFavs', function(req,res){
    //get all info about the wine
    wineJson = req.body["wines"][0];
    //add it to the DB. If it is already there nothing happens
    dataLayer.addToDB(wineJson).then(function(result){
        //add it to the favorites
        dataLayer.addToFavorites(wineJson['code']);
    });
});

app.post('/removeFromFavs', function(req,res){
    //get the api code from passed in vals
    wineApiCode = req.body["code"];
    console.log(wineApiCode);
    dataLayer.removeFromFavorites(wineApiCode);
    res.send("it worked");

});

app.listen(3000, () => {
  console.log('listening on 3000')
})
