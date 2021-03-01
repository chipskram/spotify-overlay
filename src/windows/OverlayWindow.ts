import {
  AspectRatioMode,
  MouseButton,
  QGridLayout,
  QMouseEvent,
  QPixmap,
  QPoint,
  QWidget,
  WidgetEventTypes,
  WindowType
} from "@nodegui/nodegui";
import {NativeRawPointer} from "@nodegui/nodegui/dist/lib/core/Component";
import path from "path";
import * as fs from "fs";
import {createImageLabel, createTextLabel} from "../helper/util";

const overlayWindow = new QWidget();
const mousePos = new QPoint(0, 0);
let mouseClicked = false;

const addListeners = () => {
  overlayWindow.addEventListener(WidgetEventTypes.MouseButtonPress, (nativeEvt) => {
    const mouseEvt = new QMouseEvent(nativeEvt as NativeRawPointer<"QEvent">);
    if(mouseEvt.button() === MouseButton.LeftButton) {
      mouseClicked = true;
      mousePos.setX(mouseEvt.x());
      mousePos.setY(mouseEvt.y());
    }
  });

  overlayWindow.addEventListener(WidgetEventTypes.MouseButtonRelease, (nativeEvt) => {
    const mouseEvt = new QMouseEvent(nativeEvt as NativeRawPointer<"QEvent">);
    if(mouseEvt.button() === MouseButton.LeftButton) {
      mouseClicked = false;
    }
  });

  overlayWindow.addEventListener(WidgetEventTypes.MouseMove, (nativeEvt) => {
    const mouseEvt = new QMouseEvent(nativeEvt as NativeRawPointer<"QEvent">);
    if(mouseClicked) {
      const diff = new QPoint(mouseEvt.x() - mousePos.x(), mouseEvt.y() - mousePos.y());
      const newpos = new QPoint(overlayWindow.pos().x + diff.x(), overlayWindow.pos().y + diff.y());
      overlayWindow.move(newpos.x(), newpos.y());
    }
  });
}

const init = () => {
  overlayWindow.setWindowFlag(WindowType.SubWindow, true);
  overlayWindow.setWindowFlag(WindowType.FramelessWindowHint, true);

  const stylesheet = fs.readFileSync(path.resolve(__dirname, "../styles/overlay.css"), {encoding: "utf8"});
  overlayWindow.setFixedSize(400, 100);
  overlayWindow.setStyleSheet(stylesheet);

  overlayWindow.setObjectName("overlayRoot");
  const rootLayout = new QGridLayout();
  overlayWindow.setLayout(rootLayout);

  const placeholderPath = path.resolve("assets/placeholder-image.png");
  console.log(placeholderPath);
  const albumImage = new QPixmap();
  albumImage.load(placeholderPath);

  const albumCover = createImageLabel("albumCover", albumImage);
  const songLabel = createTextLabel("songLabel", "Song");
  const artistLabel = createTextLabel("artistLabel", "Artist");

  rootLayout.addWidget(albumCover, 0, 0, 2);
  rootLayout.addWidget(songLabel, 0, 1);
  rootLayout.addWidget(artistLabel, 1, 1);

  console.log(albumCover.size().width(), albumCover.size().height());
  albumCover.setFixedSize(80, 80);
  albumCover.setPixmap(albumImage.scaled(albumCover.size().height(), albumCover.size().height(), AspectRatioMode.KeepAspectRatio));

  addListeners();
}

init();
export { overlayWindow };