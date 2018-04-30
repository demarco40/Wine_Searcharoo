const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var dataLayer = require('./JS/data.js');
app.use(express.static("../Wine_Searcharoo"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Get endpoint for the starting page. Does nothing but render the index
app.get('/', function(req, res) {
    res.render('pages/index');
});

//Search end point. This will generate the html for a search
app.get('/search', function(req, res) {
    //It will generate the return html then send it back to put on the page
    res.render('partials/search',{wines: req.query["wines"]}, function(err,html){
        res.send(JSON.stringify(html));
    });
});

//Modal end point. This will generate the modal html then add it to the page
app.get('/modal', function(req, res){
    //It will generate the modal then return it to put on the page
    res.render('partials/modal',{wine: req.query["wines"]},function(err,html){
        res.send(JSON.stringify(html));
    });
});

//Favorites end point. This will create the html for the favorites page
app.get('/favorites', function(req, res){
	//start by getting all of the wines that are favorites
    dataLayer.select("SELECT * FROM wine WHERE ?",{favorite:1}).then(function(result){

        //If it did not get anything back then make the no favorites HTML
        if (result.length == 0){
            res.render('partials/favorites',{wines: null},function(err,html){
                res.send(JSON.stringify(html));
            });
        }

		//It did get wines back so render the favorites page with all the wines
        res.render('partials/favorites',{wines: result},function(err,html){
            res.send(JSON.stringify(html));
        });
    });

});

//List end point. This will generate whichever list they are looking for
app.get('/list', function(req, res){
	//find out which type of list we are working with
    searchJson = (req.query['listType'] == 'wish') ? ({wish_list:1}) : ({inventory_list:1});

	//Get all wines that are in whichever list we are looking for.
	//Wine_ID is the key that is used in the list table
    dataLayer.select("SELECT wine_ID FROM list WHERE ?",searchJson).then(function(result){

		//No wines in the list. Have ejs render the no wines page
        if (result.length == 0) {
            res.render('partials/list',{wines: null, listType: req.query['listType']},function(err,html){
                res.send(JSON.stringify(html));
            });
        }
        else{
            //create a query that will get all of the wines using the returned wine_IDs
            idArray = Array();
            queryString = "SELECT * FROM wine WHERE wineID in (";
            for (var i = 0; i < result.length; i++) {
                idArray.push(result[i]['wine_ID']);
                queryString += "?,";
            }
			//get rid of the extra comma at the end
            queryString = queryString.slice(0,-1);
            queryString += ")";

			//get all of the wine info for the IDs that were found.
			//Pass it into the function to create the list HTML
            dataLayer.select(queryString, idArray).then(function(wineJson){
                res.render('partials/list',{wines: wineJson, listType: req.query['listType']},function(err,html){
                    res.send(JSON.stringify(html));
                });
            });
        }

    });

});

//Custom endpoint that only runs after form
app.get('/custom', (req, res) => {
	res.render('pages/index');
});


app.post('/custom', (req, res) => {
//   res.render('partials/custom', {
//     data: req.body, // { name, vintage, region, winery, blend, price }
//     errors: {
//       custName: {
//         msg: 'A name is required'
//       },
//       custVintage: {
//         msg: 'That vintage doesn‘t look right. [YYYY]'
//       },
//       custRegion: {
//         msg: 'A region was improperly written'
//       },
//       custWinery: {
//         msg: 'A winery name was improperly written'
//       },
//       custBlend: {
//         msg: 'The blend was improperly written'
//       },
//       custPrice: {
//         msg: 'A price must be entered as [x.xx] or [$x.xx]'
//       }
//     }
// });

	console.log(req.body);

   	var custJson = {code: "custom",
	name: req.body['name'],
	region: req.body['region'],
	winery: req.body['winery'],
	grape_varietal: req.body['blend'],
	price: req.body['price'],
	vintage: req.body['vintage'],
	image_url: "imgs/custDefault.png",
	favorite: 1};
	//"listType": "inventory_list"}

  dataLayer.addToDB(custJson)// .then(function(result){
        //add it to the list
        //dataLayer.addToList(wineJson['code'],listType);
    //});
});

 // **************** EDITED ABOVE ****************************************

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

app.post('/removeFromList', function(req,res){
    //get the list type from passed in json
    var listType = req.body['type'];
    //get all the wine info
    var wineApiCode = req.body['code'];
    //first add it to the database. If it is already there nothing happens

    //add it to the list
    dataLayer.removeFromList(wineApiCode,listType);
    res.send("it worked");

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
});
