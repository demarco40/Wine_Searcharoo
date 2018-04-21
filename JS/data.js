var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'student',
    database: 'wine_search'
});
module.exports = {//this makes it so you can use the functions in another file
    select: function (wineJson) {//slightly different naming convention
        //console.log(wineJson);
        var queryParams  = {wineApiCode: 'code-var-from-input'};
        var query = connection.query('SELECT * FROM wine WHERE ?', queryParams, function(err, result) {
        });
    },
    insert: function (input) {
        //TODO: need to add vintage to database, then to query params
        //TODO: need to make wineId auto increment in the database so we dont need to pass in a value


        //need to check if it already exists before adding
        var itExists = false;
        connection.query('SELECT * FROM wine WHERE ?',{wineApiCode:input.code},function(err,result){
            itExists = (result.length > 0) ? (true) : (false);//if somthing comes back it exists
        });

        //eventually wineID wont be there because it will auto increment
        if (!itExists){
            var queryParams  = wineApiCode: input.code, name: input.name, region: input.region,
                 winery:input.winery, grape_varietal: input.varietal,price: input.price, vintage: input.vintage,
                 image_url: input.image,favorite:0 };

            connection.query('insert into wine set ?', queryParams, function(err, result) {
                console.log(err);
                console.log(result);
            });
        }
    }
};
