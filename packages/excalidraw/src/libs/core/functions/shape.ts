import { useDraw, useSelection } from "../hooks";
import { shape } from "../../stores/shape";
import { clearAndRedraw } from "./draw";

export function startMoving() {
  const { isMoving } = useSelection();

  isMoving.value = true;
}

export function stopMoving() {
  const { isMoving } = useSelection();

  isMoving.value = false;
}

export function moveShape(ev: MouseEvent) {
  const { cursor, shapes } = useDraw();
  const { isMoving } = useSelection();

  if (!isMoving.value) return;
  clearAndRedraw();
  const selectedShapeIndex = shapes.value.findIndex(
    (sh) => sh.id === shape.selectedShape!.id,
  );

  if (selectedShapeIndex === -1) return;

  cursor.current.x = ev.offsetX;
  cursor.current.y = ev.offsetY;

  const oldX = shape.selectedShape.originalX!;
  const oldY = shape.selectedShape.originalY!;

  shapes.value[selectedShapeIndex].translate(
    oldX + (cursor.current.x - cursor.initial.x),
    oldY + (cursor.current.y - cursor.initial.y),
  );
}

export function updateSelectedShape(
  shapeId: string,
  options: Record<string, any>,
) {
  const { shapes } = useDraw();
  const findedIndex = shapes.value.findIndex((shp) => shp.id === shapeId);
  if (findedIndex !== -1) {
    shapes.value[findedIndex].options = {
      ...shapes.value[findedIndex].options,
      ...options,
    };
  }

  // clearAndRedraw();
}
