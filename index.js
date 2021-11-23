require('dotenv').config();                                 // Save credentials in .env for security
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const util = require('util');
const bodyParser = require('body-parser')
const cors = require('cors');
const strip = require('strip-color');

const app = express();

// This is the credentialing for the Spotify API
// Replace these with the proper credentials
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:8888/'            // The callback url that Spotify will respond to.

});

app.use(cors());

// The key expires in 1 hour so it is important to have the ability to re-request a key
// This will send the credentials over to get a new OAuth key from Spotify Server
spotifyApi.clientCredentialsGrant()
    .then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
);

app.use(bodyParser.urlencoded({extended: true}));

app.get("/get-playlist", (req, res) => {
    /*
        Sends the theme to spotify servers for the playlist
        from the list of 10 that is sent from Spotify
        one is chosen at random.
    */
      
    const theme = req.query.theme
    let randomPlayList = Math.floor(Math.random() * 10);
    let playList;

    spotifyApi.searchPlaylists(theme)
    .then(function(data) {
        playList = util.inspect(data.body.playlists.items[randomPlayList].id, false, null, true);
        quotesRemoved = playList.replace(/[']/g, "");
        res.send('https://open.spotify.com/embed/playlist/' + `${strip(quotesRemoved)}` + '?utm_source=generator');
    }, function(err) {
        console.log('Something went wrong!', err);
    });
})

// This will provide a JSON object of multiple playlists of a selected theme
app.get("/get-multi-playlist", (req, res) => {
    const theme = req.query.theme
    let playList;
    getCredentials(); // Get the missing credentials if necessary
    let jsonPlayLists = {};
        
    spotifyApi.searchPlaylists(theme)
    .then(function(data) {
        playList = data.body.playlists.items;
        
        for (let i = 0; i < playList.length; i++) {             
            quotesRemoved = playList[i].id;
            jsonPlayLists[playList[i].name] = 'https://open.spotify.com/embed/playlist/' + `${quotesRemoved}` + '?utm_source=generator'; 
        }
                
        console.log(jsonPlayLists);
        res.send(JSON.stringify(jsonPlayLists));
    }, function(err) {
        console.log('Something went wrong!', err);
    });
})

app.listen(8888, () => console.log("Started on port 8888"));
