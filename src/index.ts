import {mainWindow} from "./windows/MainWindow";

mainWindow.show();

// Prevent garbage collection
(global as any).mainWindow = mainWindow;