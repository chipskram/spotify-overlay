import {QLabel, QPixmap} from "@nodegui/nodegui";

export const createTextLabel = (id: string, content: string) : QLabel => {
  const label = new QLabel();
  label.setObjectName(id);
  label.setText(content);
  return label;
}

export const createImageLabel = (id: string, content: QPixmap) : QLabel => {
  const label = new QLabel();
  label.setObjectName(id);
  label.setPixmap(content);
  return label;
}