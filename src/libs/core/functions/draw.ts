import { useDraw } from "../hooks";
import { Line } from "../line";
import { Rectangle } from "../rectangle";
import { Shape } from "../shape";
import { Action } from "../type";

// let currentPath = [];
// let points: number[][] = [];
let currentShape: Shape;

export function startDrawing(_ev: MouseEvent) {
  const { isDrawing } = useDraw();

  isDrawing.value = true;
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
  shapes.value.forEach((shp) => {
    shp.draw();
  });
}

export function clear() {
  window.ctx.clearRect(0, 0, innerWidth, innerHeight);
}

export function clearAndRedraw() {
  clear();
  redrawShapes();
}
