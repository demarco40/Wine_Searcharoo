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
    select: function (searchVal,searchJson) {//slightly different naming convention
        return new Promise(function(resolve, reject){
            connection.query('SELECT * FROM wine WHERE ?', searchJson, function(err, rows,fields) {
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
        connection.query('SELECT * FROM wine WHERE ?',{wineApiCode: String(wineJson.code)},function(err,result){
            if (result.length > 0) {
                //there was a result

            }
            if (result.length == 0){
                //there was no result. add it
                var queryParams  = {wineApiCode: wineJson.code, name: wineJson.name, region: wineJson.region,
                     winery:wineJson.winery, grape_varietal: wineJson.varietal,price: wineJson.price, vintage: wineJson.vintage,
                     image_url: wineJson.image,favorite:0 };

                connection.query('insert into wine set ?', queryParams, function(err, result) {
                    console.log("INSERTED: "+result);
                });
            }
        });
    },
    addToList: function (wineApiCode, listType) {
        //listType = 'wish' || 'inventory'
        //need to check if it already exists in the list
        checkJson = (listType == 'wish') ? ({wish_list:1}) : ({inventory_list:1});
        //checkJson.wineApiCode = wineApiCode;
        //connection.query('SELECT * FROM list JOIN wine on list.wineID = wine.wineID WHERE ?',checkJson,function(err,result){
        connection.query('SELECT * FROM list WHERE ?',checkJson,function(err,result){
            //result is the list of all wines in the correct list.
            //If the searched wine already exists just increment the quantity
            // console.log("All wines in list (check if it exists): "+result);
            // connection.query("SELECT * FROM wine WHERE ?",{wineApiCode:wineApiCode},function(err,result){
            //     console.log("get the ID for the searched wine: ");
            //     console.log(result);
            // });
            console.log("All items in the list to check against: ");
            if (result.length == 0) {
                //There is nothing in the list. add it
            }
            console.log(result);

            return false;
        });

        //eventually wineID wont be there because it will auto increment
        // if (!queryExists){
        //     //need to get the wineID using a select
        //     var queryParams  = {wineID: input.code, wish_list: 0, inventory_list: 0,quantity:1};
        //     if (listType == 'wish') queryParams.wish_list = 1;
        //     if (listType == 'inventory') queryParams.inventory = 1;
        //
        //     connection.query('insert into list set ?', queryParams, function(err, result) {
        //         console.log("ERROR: " + err);
        //         console.log("INSERTED: "+result);
        //     });
        // }
    }
};
