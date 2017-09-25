// inport keys from the keys file
var keys = require('./keys')


// pull 20 tweets from a user
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



// Pulls songs from spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
 function runSpotify(){
   var song = process.argv.slice(3).join(" ");
   spotify.search({ type: 'track', query: song , limit: 1})
      .then(function (response) {
         // finding the album
         console.log('The album: \"' +response.tracks.items[0].album.name+'\"');
         // finding the artist
       var artists = response.tracks.items[0].artists ;
       artists.forEach(function(element) {
          console.log(element.name);
       }, this);
       // finding the links
       console.log(response.tracks.items[0].album.external_urls.spotify)
      })
      .catch(function (err) {
         // console.log(err);
      });
 }

 


var command = process.argv[2];
switch (command) {
   case 'my-tweets':
      runTwitter();
      break;
   case 'spotify-this-song':
      runSpotify();
      break;
   case 'movie-this':
      runMovies();
      break;
   case 'do-what-it-says':
      runWhat();
      break;
   default:
      console.log("Sorry I dont have that command");
}


