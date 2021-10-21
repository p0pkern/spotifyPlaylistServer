require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const util = require('util');

const app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:8888/'

});

spotifyApi.setAccessToken(process.env.ACCESS);

// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', {limit:10, offset:20}).then(
//     function(data) {
//         console.log('Artist albums', data.body);
//     },
//     function(err){
//         console.error(err);
//     }
// );

spotifyApi.searchPlaylists('workout')
  .then(function(data) {
    console.log('Found playlists are', util.inspect(data.body.playlists.items[0].id, false, null, true));
  }, function(err) {
    console.log('Something went wrong!', err);
});
