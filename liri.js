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


