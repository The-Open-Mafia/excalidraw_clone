import { draw, redrawShapes, startDrawing, stopDrawing } from "./functions";
import { useDraw } from "./hooks";
import { Line } from "./line";
import { Rectangle } from "./rectangle";
import { Shape } from "./shape";
import { shape } from "./stores/shape";

export function init(canvas: HTMLCanvasElement) {
  let { isDrawing, shapes, cursor } = useDraw();

  if (localStorage.excalidraw)
    shapes.value = parseShapes(JSON.parse(localStorage.excalidraw));
  redrawShapes();

  isDrawing.value = false;
  canvas.addEventListener("mousedown", (ev) => {
    if (!shape.currentShape) startDrawing(ev);
  });
  canvas.addEventListener("mousemove", (ev) => {
    if (isDrawing.value) return draw(ev);
    shape.currentShape = shapes.value
      .reverse()
      .find((shape) => shape.checkCollision(ev));
  });
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("click", handleClick);
  function handleClick() {
    shapes.value.map((s) => (s.isSelected = false));
    redrawShapes();

    if (shape.currentShape) {
      shape.currentShape.isSelected = true;
      shape.currentShape.draw();
    }
  }
}

// TODO Refactor me
function parseShapes(shapes: Shape[]) {
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

    return nshape;
  });
}
