import { redrawShapes } from "../functions";
import { reactive } from "../reactivity/reactive";
import { ref } from "../reactivity/ref";
import { Shape } from "../shape";
import { Cursor, Ref } from "../type";

let _useDraw: {
  cursor: Cursor;
  isDrawing: Ref<boolean>;
  shapes: Ref<Shape[]>;
  addShape: (shape: Shape) => void;
  reset: () => void;
};
function useDraw() {
  if (_useDraw) return _useDraw;
  const isDrawing = ref(false);
  const shapes = ref<Shape[]>([]);
  const cursor = reactive<Cursor>(
    {
      initial: { x: 0, y: 0 },
      current: { x: 0, y: 0 },
    },
    [
      ({ type }) => {
        if (type === "pencil") document.body.style.cursor = "crosshair";
        else document.body.style.cursor = "default";
      },
    ]
  );

  function addShape(shape: Shape) {
    if (!shapes.value.find((shp) => shp.id === shape.id))
      shapes.value.push(shape);
    localStorage.excalidraw = JSON.stringify(shapes.value);
  }
  function reset() {
    shapes.value = [];
    localStorage.clear();
    redrawShapes();
  }

  _useDraw = { cursor, isDrawing, shapes, addShape, reset };
  return _useDraw;
}

export { useDraw };
