let accessToken;
const clientID = "68a0f5b3b6dc437793b5c393f56ce4fe";
const redirectUrl = "http://localhost:3000";

const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        const tokenURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
        window.location = tokenURL;
    },
    
    checkAuth() {
        const authenticated = window.location.href.match(/access_token=([^&]*)/);
        if (authenticated) {
            accessToken = authenticated[1];
            return true;
        } else {
            return false;
        }
    },


    getProfile(accessToken) {
        if(!accessToken) {
            return Promise.reject(new Error('Access token is missing'));
        }
        const nameEndpoint = "https://api.spotify.com/v1/me";
        return fetch(nameEndpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch user data');
            }
        })
        .then((data)=> {
            const userName = data.display.name;
            return userName;
        });
    },

    search(term) {
        accessToken = Spotify.getAccessToken();
        let endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;

        return fetch(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then(response => response.json())
        .then((data) => {
            const tracksResults = data.tracks.items.map(t => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri
            }));
            return tracksResults;
        });
    },

    savePlaylist(name, trackUris) {
        if (!name || !trackUris) {
            return;
        }

        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me' , {headers: header})
        .then(response => response.json())
        .then((jsonResponse) => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: header,
                method: "POST",
                body: JSON.stringify({name: name}),
            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: header,
                    method: "POST",
                    body: JSON.stringify({uris: trackUris}),
                })
            });
        })
    },
};




export {Spotify};