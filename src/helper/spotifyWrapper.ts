import SpotifyWebApi from "spotify-web-api-node";
import config from "config";

const credentials = {
  clientId: config.get("clientId") as string,
  clientSecret: config.get("clientSecret") as string,
  redirectUri: "http://localhost/authenticate/"
}

const scopes = ["user-read-playback-state"];
const spotify = new SpotifyWebApi(credentials);

const createAuthorizeURL = () => {
  return spotify.createAuthorizeURL(scopes, "pending");
}

export {
  createAuthorizeURL,
  spotify
};