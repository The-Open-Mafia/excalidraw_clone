import {
  clearAndRedraw,
  draw,
  moveShape,
  redrawShapes,
  startDrawing,
  startMoving,
  stopDrawing,
  stopMoving,
} from "./functions";
import { useDraw } from "./hooks";
import { Line } from "./line";
import { Rectangle } from "./rectangle";
import { Shape } from "./shape";
import { shape } from "./stores/shape";

export function init(canvas: HTMLCanvasElement) {
  const { isDrawing, shapes, cursor, persist } = useDraw();

  if (localStorage.excalidraw)
    shapes.value.push(...parseShapes(JSON.parse(localStorage.excalidraw)));

  console.log(shapes.value);

  redrawShapes();

  isDrawing.value = false;
  canvas.addEventListener("mousedown", (ev) => {
    if (!shape.currentShape) startDrawing(ev);
    if (shape.selectedShape.id) startMoving();
    cursor.initial.x = ev.offsetX;
    cursor.initial.y = ev.offsetY;
  });
  canvas.addEventListener("mousemove", (ev) => {
    if (isDrawing.value) return draw(ev);
    shape.currentShape = shapes.value
      .reverse()
      .find((shape) => shape.checkCollision(ev));

    moveShape(ev);
  });
  canvas.addEventListener("mouseup", () => {
    stopDrawing();
    stopMoving();
  });
  canvas.addEventListener("click", handleClick);
  function handleClick() {
    shapes.value.map((s) => (s.isSelected = false));
    clearAndRedraw();

    if (shape.currentShape) {
      shape.selectedShape.id = shape.currentShape.id;
      shape.selectedShape.originalX = shape.currentShape.options.x;
      shape.selectedShape.originalY = shape.currentShape.options.y;
      shape.currentShape.isSelected = true;
      shape.currentShape.draw();
      persist();
      return;
    }
  }
}

// TODO Refactor me
function parseShapes(shapes: Shape[]): Shape[] {
  const shapeMappers: Record<string, Shape> = {
    // @ts-ignore
    rectangle: Rectangle,
    // @ts-ignore
    line: Line,
  };
  return shapes.map((shape) => {
    // @ts-ignore
    const nshape = new shapeMappers[shape.type](shape.options);
    nshape.id = shape.id;
    nshape.isSelected = shape.isSelected;

    return nshape;
  });
}
