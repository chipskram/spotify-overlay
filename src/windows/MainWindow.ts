import {QMainWindow, QWidget, WidgetEventTypes} from "@nodegui/nodegui";
import {overlayWindow} from "./OverlayWindow";

const mainWindow = new QMainWindow();

const addEventListeners = () => {
  // Makes sure overlay gets restored form being minimised aswell
  mainWindow.addEventListener(WidgetEventTypes.WindowActivate, () => {
    overlayWindow.raise();
    mainWindow.raise();
  });
}

const init = () => {
  mainWindow.setWindowTitle("Main Window");

  const centralWidget = new QWidget();
  mainWindow.setCentralWidget(centralWidget);

  addEventListeners();
  overlayWindow.show();
}

init();
export { mainWindow };