require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const util = require('util');
const bodyParser = require('body-parser')
const cors = require('cors');
const strip = require('strip-color');

const app = express();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:8888/'

});

app.use(cors());

spotifyApi.clientCredentialsGrant().then(
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

app.get("/post-test", (req, res) => {
    const theme = req.query.theme
    let randomPlayList = Math.floor(Math.random() * 10);
    let playList;

    spotifyApi.searchPlaylists(theme)
    .then(function(data) {
        playList = util.inspect(data.body.playlists.items[randomPlayList].id, false, null, true);
        console.log('Found playlists are', util.inspect(data.body.playlists.items[randomPlayList].id, false, null, true));
        quotesRemoved = playList.replace(/[']/g, "");
        res.send('https://open.spotify.com/embed/playlist/' + `${strip(quotesRemoved)}` + '?utm_source=generator');
    }, function(err) {
        console.log('Something went wrong!', err);
    });
})


app.listen(8888, () => console.log("Started on port 8888"));