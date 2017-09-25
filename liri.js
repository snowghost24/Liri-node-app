// inport keys from the keys file
var keys = require('./keys')

// ────────────────────────────────────────────────────────────────── TWITTER ─────
function runTwitter () {
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var params = {screen_name: 'nodejs',count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
 if (!error) {
    tweets.forEach(function(twitnumb) {
       console.log(twitnumb.created_at);
      console.log(twitnumb.text);
    }, this);
 }
});
}


// ────────────────────────────────────────────────────────────────── SPOTIFY ─────
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var incoming = process.argv.slice(3).join(" ");
 function runSpotify(incoming){
   
   if(incoming){
      song = incoming;
   }else{
      song = "the sign";
   }

   spotify.search({ type: 'track', query: song , limit: 19})
      .then(function (response) {
      
         console.log('The album: \"' +response.tracks.items[0].album.name+'\"');
         console.log('Song: '+ response.tracks.items[0].name);
       var artists = response.tracks.items[0].artists ;
       artists.forEach(function(element) {
          console.log('Artist '+ element.name);
       }, this);
      //  finding the links
       console.log('Link '+response.tracks.items[0].album.external_urls.spotify)
      })
      .catch(function (err) {
         console.log(err);
      });
 }

 

 // ───────────────────────────────────────────────────────────────────── OMDB ─────
 var request = require('request');
 function runMovies(){
 try {
   var movieName = process.argv.slice(3).join(" ");
   if(movieName){
      movieSet = movieName;
   }else{
      movieSet = "Mr. Nobody";
   }

   movieSet =  encodeURI(movieSet);
   var queryUrl = "http://www.omdbapi.com/?t=" + movieSet + "&y=&plot=short&apikey=40e9cece";
 request(queryUrl, function(error, response, body) {
     if (!error && response.statusCode === 200) {
       // Then log the body from the site!
       var newBody = JSON.parse(body);
       console.log("Title: "+ newBody.Title);
       console.log("actors: "+newBody.Actors);
       console.log("Released: "+ newBody.Released);
       console.log( "IMDB Ratings: " + newBody.imdbRating)
       console.log( "Rotten Tomatoes Ratings: " + newBody.Ratings[1].Value);
       console.log("Language: "+newBody.Language);
       console.log("Country: "+newBody.Country);
       console.log("Plot: "+newBody.Plot );
     }
   });}catch(error){confirm.error(error.message)}
   }


 // ────────────────────────────────────────────────────────────── FILE SYSTEM ─────
   fs = require('fs');
   function runWhat (){
   fs.readFile("random.txt", "utf8", function(error, data) {
      // If the code experiences any errors it will log the error to the console.
      if (error) {
        return console.log(error);
      }
      // Then split it by commas (to make it more readable)
      var dataArr = data.split(",");
        runSpotify(dataArr[1]);
    });
  }

// ───────────────────────────────────────────────────────── SWITCH STATEMENT ─────
var command = process.argv[2];
switch (command) {
   case 'my-twitter':
   case 'twitter':
   case 'my-tweets':
      runTwitter();
      break;
   case 'spotify': 
   case 'spotify-this-song':
      runSpotify();
      break;
   case 'movies':  
   case 'movie':  
   case 'movie-this':
      runMovies();
      break;
      
   case 'do-what-it-says':
      runWhat();
      break;
   default:
      console.log("Sorry I dont have that command");
}


