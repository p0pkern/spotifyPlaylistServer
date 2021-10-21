require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const util = require('util');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser')

const app = express();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:8888/'

});

// spotifyApi.setAccessToken(process.env.ACCESS);

// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit:10, offset:20}).then(
//     function(data) {
//         console.log('Artist albums', data.body);
//     },
//     function(err){
//         console.error(err);
//     }
// );

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

app.post('/post-test', (request, response) => {
    spotifyApi.searchPlaylists(request.body.theme)
    .then(function(data) {
        let playList = util.inspect(data.body.playlists.items[0].id, false, null, true);
        console.log('Found playlists are', util.inspect(data.body.playlists.items[0].id, false, null, true));
    }, function(err) {
        console.log('Something went wrong!', err);
    });
    response.sendStatus(200);
});


app.listen(8888, () => console.log("Started on port 8888"));