var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'student',
    database: 'wine_search'
});
module.exports = {//this makes it so you can use the functions in another file
    //select should have the json it is looking for passed.
    //EX: select(wineApiCode: "code")
    select: function (searchQuery,searchJson) {//slightly different naming convention
        return new Promise(function(resolve, reject){
            connection.query(searchQuery, searchJson, function(err, rows,fields) {
                if (err) return reject(err);
                resolve (rows);
                //console.log(result);
            });
        });
        //console.log(wineJson);
        //console.log(res);
    },
    addToDB: function (wineJson) {
        //need to check if it already exists before adding
        //console.log(wineJson);
        return new Promise(function(resolve, reject) {
            connection.query('SELECT * FROM wine WHERE ?',{wineApiCode: String(wineJson.code)},function(err,result){
                if (err) return reject(err);

                if (result.length > 0) {
                    //there was a result
                    resolve("already exists");
                }
                if (result.length == 0){
                    //there was no result. add it
                    var queryParams  = {wineApiCode: wineJson.code, name: wineJson.name, region: wineJson.region,
                         winery:wineJson.winery, grape_varietal: wineJson.varietal,price: wineJson.price, vintage: wineJson.vintage,
                         image_url: wineJson.image,favorite:0 };

                    connection.query('insert into wine set ?', queryParams, function(err, result) {
                        if (err) return reject(err);
                        resolve(result);
                    });
                }
            });

        });
    },
    addToList: function (wineApiCode, listType) {
        //get the wineID for the apiCode
        //check if that ID already in the list table
            //If it is already in the table
                //Check to see if it is in the requested list
                    //if it is already in the list increment increment it
                    //Not in the requested but in the list table means it is in the other list.
                        //Add it to the table but keep the other list as a 1
            //Not in the table. add it with defaults of 0 and 1 for the list
        connection.query("SELECT wineID FROM wine WHERE ?",{wineApiCode:String(wineApiCode)},function(err,result){
            //The wine was not found in the database if this error comes back
            if (err) return console.log(err);
            else if (result.length == 1){//The wineID was found. use it for the next query
                //this is the wine ID of the passed in wine
                //console.log(result);
                //console.log(result['wineID']);
                //Do a query to see if that id is already in the list (for either type)
                queryParams  = {wine_ID: result[0]['wineID'], wish_list: 0, inventory_list: 0,wishQty:0,invQty:0};
                connection.query("select * from list WHERE ?",{wine_ID:result[0]['wineID']},function(err,result){
                    //error when getting this wineID from the list.
                    if (err) return err;
                    console.log("params:");
                    wineID = queryParams["wine_ID"];


                    if(result.length == 0){
                        console.log("adding new");
                        //Not already in any lists. add it to the requested list. other list is 0.
                        if (listType == 'wish') {
                            queryParams.wish_list = 1;
                            queryParams.wishQty = 1;
                        }
                        if (listType == 'inventory') {
                            queryParams.inventory_list = 1;
                            queryParams.invQty = 1;
                        }
                        connection.query('insert into list set ?', queryParams, function(err, result) {
                                 console.log("ERROR: ");
                                 console.log(err);
                                 console.log("INSERTED: ");
                                 console.log(result);
                        });
                    }
                    else{
                        console.log("checking to increment");
                        if (result[0]['wish_list'] && listType == "wish"){
                            //increment the wish list quantity
                            console.log("increment quantity for wish");
                            searchJson = [{wishQty:result[0]['wishQty']+1},{wine_ID:wineID}];
                        }

                        else if (result[0]['inventory_list'] && listType == "inventory"){
                            //increment the inventory
                            console.log("increment quantity for inv");
                            searchJson = [{invQty:result[0]['invQty']+1},{wine_ID:wineID}];
                        }
                        else if(!result[0]['wish_list'] && listType == "wish"){
                            console.log("add to wish list, qty 1");
                            //add to wish list. make qty 1
                            searchJson = [{wish_list:1,wishQty:1},{wine_ID:wineID}];
                        }
                        else if(!result[0]['inventory_list'] && listType == "inventory"){
                            console.log("add to inv list, qty 1");
                            //add to inventory, make qty 1
                            searchJson = [{inventory_list:1,invQty:1},{wine_ID:wineID}];
                        }
                        //[{wishQty:result[0]['wishQty']+1},{wine_ID:result[0]['wineID']}]
                        connection.query("UPDATE list set ? where ?", searchJson,
                          function(err, result){
                             if (err) console.log(err);
                             else{
                                 console.log(result);
                             }
                         });
                    }
                });//End list select
            }//End wineID else
        });//WineID select
    },//end add to list
    addToFavorites: function(apiCode){
        connection.query("UPDATE wine SET favorite = 1 where ? ",{wineApiCode: apiCode},function(err,result){
            console.log("Updated favorite result: ");
            console.log(result);
        });
    },
    removeFromFavorites: function(apiCode){
        connection.query("UPDATE wine SET favorite = 0 where ? ",{wineApiCode: apiCode},function(err,result){
            console.log("Updated favorite result: ");
            console.log(result);
        });
    },
    removeFromList: function(apiCode,listType){
        searchJson = Array();
        if (listType == 'wish') searchJson.push({wish_list: 0 });
        if (listType == 'inventory') searchJson.push({inventory_list: 0 });
        connection.query("SELECT wineID FROM wine WHERE ?", {wineApiCode: apiCode}, function(err, result){
            if (err) return err;
            searchJson.push({wine_ID : result[0]['wineID']});
            connection.query("UPDATE list SET ? where ? ",searchJson,function(err,result){
                console.log(result);
                console.log(err);
            });

        });

    },
    validateAndProcess: function(theForm, wineJson){
    	var reason = "";
    	reason += name
    },
    

};//end module.exports
