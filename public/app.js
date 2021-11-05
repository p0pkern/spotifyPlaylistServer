// Example Request

function generatePlaylist() {

    const req = new XMLHttpRequest();
    // Playlist must be put in as a query string with theme=[CHOSEN THEME] it is currently setup for workout
    req.open("GET", 'http://flip1.engr.oregonstate.edu:1439/get-playlist?theme=workout', true);
    req.onload = function() {
        let playlist = req.responseText;
        if (req.readyState == 4 && req.status >=200 && req.status < 400) {
            document.getElementById('spot').setAttribute('src', req.responseText);
            console.log(playlist)
        } else {
            console.error(playlist)
        }
    }
    req.send(null);
}