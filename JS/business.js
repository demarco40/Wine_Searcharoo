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
            $(".result").remove();
            $("#search").append("<h1 class='result'>no results</h1>");
        }
        //They had results. Make ajax call to server to generate html for results
        if (jsonObj["meta"]["results"] >= 1) {
            $.ajax(
            {
                url:BASE_URL+"search",
                type:"GET",
                async:true,
                data: jsonObj,
                dataType: 'json',
                success:function(result){
                    //result should be the fully made template
                    $("#search").empty();
                    $("#search").append(result);
                    //get the div that is should be in and put it there
                    //console.log(result);
                }
            }
        );
        }
    }
    else{
        //The type of json is undefined. They just opened up the search tab
        console.log("make a search");

    }
    //console.log(jsonObj["wines"]);
}

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

function addToFavorites(apiCode){
    $.ajax({
        url:SNOOTH_API+apiCode,
        type:"GET",
        async:true,
        success:function(result){
            jsonObj = JSON.parse(result)
            $.ajax(
            {
                url:BASE_URL+"addToFavs",
                type:"POST",
                async:true,
                data: jsonObj,
                success:function(result){
                    //result is the json of all the wines
                    //pass this into the makeSearch()
                }
            }
        );
        }
    });
}

function removeFromFavorites(apiCode){
    //remove from the favorites
    $.ajax(
    {
        url:BASE_URL+"removeFromFavs",
        type:"POST",
        async:true,
        data: {code: apiCode},
        success:function(result){
            console.log("here");
            makeFavorites();
            //result is the json of all the wines
            //pass this into the makeSearch()
        }
    }
);
}

function makeFavorites(){
    $.ajax(
    {
        url:BASE_URL+"favorites",
        type:"GET",
        dataType: 'json',
        success:function(result){
            $("#favorites").empty();
            $("#favorites").append(result);
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
                    var modal = $("#modalHolder");
                    modal.append(result);
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
}

function removeFromList(apiCode,listType){
    console.log("remove it");
    jsonObj = {code: apiCode, type: listType};
    $.ajax(
        {
            url:BASE_URL+"removeFromList",
            type:"POST",
            data: JSON.stringify(jsonObj),
            contentType: 'application/json',
            success:function(result){
                makeList(listType);
                console.log("made call to add wine to DB");
            }
        }
    );
}



function makeList(type) {
    $.ajax(
        {
            url:BASE_URL+"list",
            type:"GET",
            data: {listType: type},
            dataType: 'json',
            success:function(result){
                if (type=='wish') {
                    $("#wishList").empty();
                    $("#wishList").append(result);
                }
                else{
                    $("#inventory").empty();
                    $("#inventory").append(result);
                }
            }
        }
    );
}


function makeCustomWine() {
    console.log("here custom");
}
