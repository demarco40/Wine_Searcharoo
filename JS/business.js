var BASE_URL = "http://localhost:3000/";
var SNOOTH_API = 'http://api.snooth.com/wines/?akey=2x9uc7hxb09h7bqre2y6pk4ya9sabfdjht6juyd6nls7wel4&ip=66.28.234.115&q=';

function makeSearch(json) {
    //if the json object is not undefined they did wine search
    if (typeof json !== 'undefined') {
        //turn string into json object to get vals
        jsonObj = JSON.parse(json);
        //They had no results. make ajax call to server to generate HTML for no results
        if (jsonObj["meta"]["results"] == 0){
            console.log("no results");
        }
        //They had results. Make ajax call to server to generate html for results
        if (jsonObj["meta"]["results"] >= 1) {
            console.log("make the result page for ");
            console.log(jsonObj["wines"]);
        }
    }
    else{
        //The type of json is undefined. They just opened up the search tab
        console.log("make a search");
    }
    //console.log(jsonObj["wines"]);

    $.ajax(
    {
        url:BASE_URL+"search",
        type:"GET",
        async:true,
        data: jsonObj,
        dataType: 'json',
        success:function(result){
            console.log("here");
            console.log(result);
            //console.log(result);
            //result should be the fully made template
            //get the div that is should be in and put it there
            //console.log(result);
        },
        error:function(error){
            //eventually this will need to be in the success function above
            //console.log(error.responseText);
            //remove all elements from the html div with id search
            $("#search").empty();

            //replace with search result html made by server
            //This is the correct created HTML element. Not sure why it is coming back as an error...
            $("#search").append(error.responseText)
        }
    }
);}

function search(ele){
    //if they typed more than one word turn it into a string with + between words
    var searchVal = "";

    //if the search string is more than one word put a + between the words
    if (ele.value.split(" ").length > 1) {
        for (i=0; i < ele.value.split(" ").length; i++) {
            searchVal += ele.value.split(" ")[i]+"+";
        }
    }
    else {
        //if it is only one word no need to add +
        searchVal = ele.value;
    }
    //if it ends in a plus trim it off
    while (searchVal.slice(-1) == "+"){
        searchVal = searchVal.slice(0,-1);
    }

    //make api call and return 100 results
    $.ajax(
    {
        url:SNOOTH_API+searchVal+"&n=15",
        type:"GET",
        async:true,
        success:function(result){
            //result is the json of all the wines
            //pass this into the makeSearch()
            makeSearch(result);
        }
    }
);
}

function openModal(apiUnqiueCode){
    $.ajax({
        url:SNOOTH_API+apiUnqiueCode,
        type:"GET",
        async:true,
        success:function(result){
            jsonObj = JSON.parse(result)
            $.ajax({
                url:BASE_URL+"modal",
                type:"GET",
                async:true,
                data: jsonObj,
                dataType: 'json',
                success:function(result){
                    console.log("here");
                    console.log(result);
                },
                error:function(error){
                    var modal = $("#modalHolder");
                    modal.append(error.responseText);
                    var dialog = $("dialog")[0];
                    dialog.showModal();
                }
            });
        }
    });
}

function closeModal(){
    var dialog = $("dialog")[0];
    dialog.close();
    dialog.remove();
}

function addToList(wineApiCode, listType){

    //make a call to snooth to get all wine info
    $.ajax(
    {
        url:SNOOTH_API+wineApiCode,
        type:"GET",
        async:true,
        success:function(result){
            //result is a json string for the wine that was just clicked. turn it into an object
            var jsonObj = JSON.parse(result);
            jsonObj.listType = listType;

            //make an ajax call to the server to add it to the database
            //this will check to see if it exists before adding it
            $.ajax(
                {
                    url:BASE_URL+"addToList",
                    type:"POST",
                    data: JSON.stringify(jsonObj),
                    contentType: 'application/json',
                    success:function(result){
                        console.log("made call to add wine to DB");
                    }
                }
            );
        }
    }
);

            //result is a json string for the wine that was just clicked. turn it into an object
            //make an ajax call to the server to add it to the list

}

function makeInventoy() {
    console.log("here inventory");
}

function makeWishlist() {
    console.log("here wishlist");
}

function makeFavorites() {
    console.log("here favs");
}

function makeCustomWine() {
    console.log("here custom");
}
