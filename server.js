const express = require('express');
var app = express();
app.use(express.static("../Wine_Searcharoo"));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    //Do database stuff to get all information we need
    //pass it into render
    console.log(req.query);
    res.render('pages/index');
});

app.get('/')
app.listen(3000, () => {
  console.log('listening on 3000')
})
