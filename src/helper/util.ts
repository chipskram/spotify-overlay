import {QLabel, QPixmap, QWidget} from "@nodegui/nodegui";

export const createTextLabel = (id: string, content: string, parent?: QWidget) : QLabel => {
  const label = parent ? new QLabel(parent) : new QLabel();
  label.setObjectName(id);
  label.setText(content);
  return label;
}

export const createImageLabel = (id: string, content: QPixmap, parent?: QWidget) : QLabel => {
  const label = parent ? new QLabel(parent) : new QLabel();
  label.setObjectName(id);
  label.setPixmap(content);
  return label;
}