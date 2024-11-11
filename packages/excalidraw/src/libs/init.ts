import { shapeMappers } from "./constants";
import {
  clearAndRedraw,
  draw,
  moveShape,
  redrawShapes,
  startDrawing,
  startMoving,
  stopDrawing,
  stopMoving,
} from "./core/functions";
import { useDraw } from "./core/hooks";
import { Shape } from "./core/shapes";
import { Action } from "./core/type";
import { initializeEvents } from "./event";
import { shape } from "./stores/shape";

export function init(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!;
  window.ctx = ctx;
  window.action = Action.RECTANGLE;

  const { isDrawing, shapes, cursor, persist } = useDraw();

  if (localStorage.excalidraw)
    shapes.value.push(...parseShapes(JSON.parse(localStorage.excalidraw)));

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
      shape.selectedShape = {
        id: shape.currentShape.id,
        originalX: shape.currentShape.options.x,
        originalY: shape.currentShape.options.y,
      };

      shape.currentShape.isSelected = true;
      shape.currentShape.draw();
    } else shape.selectedShape = {};
    persist();
  }

  initializeEvents();
}

// TODO Refactor me
function parseShapes(shapes: Shape[]): Shape[] {
  return shapes.map((shape) => {
    // @ts-ignore
    const nshape: Shape = new shapeMappers[shape.type](shape.options);
    nshape.id = shape.id;
    nshape.isSelected = shape.isSelected;

    return nshape;
  });
}
