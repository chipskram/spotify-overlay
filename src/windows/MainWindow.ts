import {QGridLayout, QMainWindow, QPushButton, QWidget, WidgetEventTypes} from "@nodegui/nodegui";
import {overlayWindow} from "./OverlayWindow";
import {createAuthorizeURL} from "../helper/spotifyWrapper";
import open from "open";
import {createTextLabel} from "../helper/util";

const mainWindow = new QMainWindow();
const authButton = new QPushButton();

const addEventListeners = () => {
  authButton.addEventListener("clicked", async () => {
    setStatusPending();
    const authUrl = createAuthorizeURL();
    await open(authUrl);
  });
  // Makes sure overlay gets restored form being minimised aswell
  mainWindow.addEventListener(WidgetEventTypes.WindowActivate, () => {
    overlayWindow.raise();
    mainWindow.raise();
  });
}

const connectedLabel = createTextLabel("connectedLabel", "Not connected to Spotify");

const init = () => {
  const rootLayout = new QGridLayout();
  mainWindow.setWindowTitle("Main Window");

  const centralWidget = new QWidget();
  mainWindow.setCentralWidget(centralWidget);
  centralWidget.setLayout(rootLayout);

  setStatusNotConnected();

  authButton.setText("Authenticate");

  rootLayout.addWidget(authButton, 0, 0);
  rootLayout.addWidget(connectedLabel, 1, 0);

  addEventListeners();
  overlayWindow.show();
}

const setStatusConnected = () => {
  connectedLabel.setText("Connected to Spotify!");
  connectedLabel.setInlineStyle("color: green;");
}

const setStatusPending = () => {
  connectedLabel.setText("Connecting...");
  connectedLabel.setInlineStyle("color: orange;");
}

const setStatusNotConnected = () => {
  connectedLabel.setText("Not connected to Spotify");
  connectedLabel.setInlineStyle("color: red;");
}

init();
export { mainWindow, setStatusConnected };