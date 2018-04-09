var BASE_URL = "http://localhost:3000";

function makeSearch() {
    $.ajax(
    {
        url:BASE_URL,
        type:"GET",
        async:true,
        success:function(result){
            //result should be the fully made template
            //get the div that is should be in and put it there
            console.log(result);
        }
    }
);
console.log("here search");
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
