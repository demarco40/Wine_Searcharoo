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
    select: function (searchJson) {//slightly different naming convention
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
    insert: function (input) {
        //need to check if it already exists before adding

        var queryExists = connection.query('SELECT * FROM wine WHERE ?',{wineApiCode:input.code},function(err,result){
            console.log("IT EXISTS: "+result);
            return (result.length > 0) ? (true) : (false);//if somthing comes back it exists
        });

        //eventually wineID wont be there because it will auto increment
        if (!queryExists){
            var queryParams  = {wineApiCode: input.code, name: input.name, region: input.region,
                 winery:input.winery, grape_varietal: input.varietal,price: input.price, vintage: input.vintage,
                 image_url: input.image,favorite:0 };

            connection.query('insert into wine set ?', queryParams, function(err, result) {
                console.log("ERROR: " + err);
                console.log("INSERTED: "+result);
            });
        }
    }
};
