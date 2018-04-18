var BASE_URL = "http://localhost:3000";
var SNOOTH_API = 'http://api.snooth.com/wines/?akey=2x9uc7hxb09h7bqre2y6pk4ya9sabfdjht6juyd6nls7wel4&ip=66.28.234.115&q=';

function makeSearch() {
    console.log("here search");
    $.ajax(
    {
        url:SNOOTH_API,
        type:"GET",
        async:true,
        data: {search: "SEARCH_VAL"},
        success:function(result){
            //result should be the fully made template
            //get the div that is should be in and put it there
            console.log(result);
        }
    }
);}

function search(ele){
    
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

