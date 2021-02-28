const { QMainWindow } = require("@nodegui/nodegui");
const win = new QMainWindow();
win.show();

(global as any).win = win;