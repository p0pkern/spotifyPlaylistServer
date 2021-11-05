![Node.js Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Spotify Badge](https://img.shields.io/badge/Spotify-1ED760?&style=for-the-badge&logo=spotify&logoColor=white)

# spotifyPlaylistServer

Hello,

My name is Chris Peterman and I am a Computer Science college student at Oregon State University. I'm in my final year of school and will graduate Spring 2022.

Creates a server that accepts a single theme tag and returns a random playlist using the Spotify Api.

## Installation - Server
Download the files and run

```bash
npm install
```

If you have a server set up, or a link and all you want to do is send a request, go to Server Request Setup, if you would like the steps for setting up the serer continue onto Spotify Account Setup.

## Spotify Account Setup
The Spotify API runs on OAuth2. There will be some credentialing before getting anything started. Spotify provides a robust database of it's documentation (Link:[Spotify Api](https://developer.spotify.com/documentation/web-api/)) which is a fantastic resource, however I did not find it 'Absolute Beginner Friendly', so I'm providing the below steps for the initial setup.

Steps to get from 0 to Token:
1. Create a Spotify Developer Account Link:[Spotify Developer](https://developer.spotify.com/dashboard/login)
2. Login to your account and go to the Dashboard
3. On the Dashboard create a new app
![Image of Dashboard](/imgs/dashboard.png)
4. On your app you will be provided with a Client ID and a Client Secret (you need to click 'SHOW CLIENT SECRET' to see the secret key) these are important and should be protected.
![Dashboard Credentials](/imgs/appimage.png)
5. Replace the CLIENT_ID, and CLIENT_SECRET portions of the index.js file with the proper information. **Please Do Not Upload Your Credentials to Github/Version control.** 
6. Next, you need to have a redirect url. This is the callback url that Spotify uses to confirm that the website you send the key request from is trusted.
    * On your Dashboard under your app go to 'edit settings'
    * Under redirect Urls, input your server url address
    * click Add
7. Put that redirect url in the redirect_url portion of the code.
8. You are set! Start up the server and request your first playlist using the provided html document.
9. I utilized [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node) to build this server. If you'd like to expand or modify your own version of this server, I highly reccommend using spotify-web-api-node (for Node.js users). The documentation is great, and it handles a ton of funcionalities.

## Server Request Setup
Once you have the server setup. All of the credentialing and fine tuning is taken care of on the server end. The index.html in my public folder is a good spot to look for an example of a XMLHttpRequest, but you can use whichever request you like.

This server is built for my Software Engineering 1 class at Oregon State University. Unfortunately, unless you are a student and can log into the OSU VPN, you will not be able to use my server. The steps below are designed for my fellow student group members, but if you change the url to your own server it should work fine.

1. Send a GET request to the following address. Replace the theme query with your own keyword.

```html
    http://flip1.engr.oregonstate.edu:1439/get-playlist?theme=[THE THEME YOU WANT E.G. 'WORKOUT']
```
2. The server will send back a url string. Example below.

```html
https://open.spotify.com/embed/playlist/3GQGhZGZ8fiGdntzsgXh2Q?utm_source=generator
```
3. Simply place that source url in the src portion of an iframe tag. Example below.

```html
<iframe id="spot" src="" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
```
4. Enjoy your randomly generated playlist.

![Rap Playlist](/imgs/playlist.png)

## Contributing
Pull requests are welcome.