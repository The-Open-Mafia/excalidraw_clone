import { useDraw } from "../hooks";
import { Line } from "../line";
import { Rectangle } from "../rectangle";
import { Shape } from "../shape";
import { Action } from "../type";

let currentPath = [];
let points: number[][] = [];
let currentShape: Shape;

export function startDrawing(ev: MouseEvent) {
  const { isDrawing, cursor } = useDraw();

 isDrawing.value = true;

  cursor.initial.x = ev.offsetX;
  cursor.initial.y = ev.offsetY;

  //   currentPath = [{ x: ev.offsetX, y: ev.offsetY }];
}

export function stopDrawing() {
  let { isDrawing, cursor, addShape } = useDraw();
  cursor.type = undefined;
  isDrawing.value = false;
  if (currentShape) addShape(currentShape);
  clearAndRedraw();
}

export function draw(ev: MouseEvent) {
  const { isDrawing, cursor } = useDraw();

  if (!isDrawing.value) return;
  cursor.current.x = ev.offsetX;
  cursor.current.y = ev.offsetY;

  clearAndRedraw();

  const shapeMappers = {
    [Action.RECTANGLE]: Rectangle,
    [Action.LINE]: Line,
  };

  const shape = new shapeMappers[window.action]({});
  shape.draw(cursor);

  currentShape = shape;
}

export function redrawShapes() {
  const { shapes } = useDraw();
  shapes.value.forEach((shape) => {
    shape.isSelected = false;
    shape.draw();
  });
}

function clearAndRedraw() {
  window.ctx.clearRect(0, 0, innerWidth, innerHeight);
  redrawShapes();
}
