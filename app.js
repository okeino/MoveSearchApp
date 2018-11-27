var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    
    var myQuery = req.query.search;
   var url ="http://omdbapi.com/?s=" + myQuery + "&apikey=thewdb";
   
     request(url, function(err, response, body){
        
        if(!err && response.statusCode == 200){
            var parsedData = JSON.parse(body);
             res.render("results", {results:parsedData});
        }
     });
    
});

app.get("/results/:mId", function(req, res){
    var movieId = req.params.mId;
    //console.log(req.params.mId);
    var murl = "http://omdbapi.com/?i=" + movieId + "&apikey=thewdb";
   
    request(murl, function(err, response, body){
        
        if(!err && response.statusCode == 200){
            var movieData = JSON.parse(body);
            res.render("movie", {movie:movieData});
        }
    });
    
});







app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Movie App Started!!!"); 
});