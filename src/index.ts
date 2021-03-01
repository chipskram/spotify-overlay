import {mainWindow, setStatusConnected} from "./windows/MainWindow";
import {Request, Response} from "express";
import express from "express";
import {spotify} from "./helper/spotifyWrapper";

const app = express();

const port = 80;
app.use(express.json());

app.get("/authenticate", (req: Request, res: Response) => {
  spotify.authorizationCodeGrant(req.query.code as string).then((data) => {
    spotify.setAccessToken(data.body.access_token);
    spotify.setRefreshToken(data.body.refresh_token);
    console.log("Authentication successful!");
    setStatusConnected();
    res.sendStatus(200);
  }, (err) => {
    console.log("ERROR", err);
    res.sendStatus(500);
  });
})

app.listen(port);
console.log(`Listening at http://localhost:${port}`);

mainWindow.show();

// Prevent garbage collection
(global as any).mainWindow = mainWindow;