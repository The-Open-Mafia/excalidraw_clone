import { v4 as uuid } from "uuid";
import { Cursor } from "./type";

export interface ShapeInterface {
  id: string;
  options: {
    x?: number;
    y?: number;
  } & Record<string, any>;
  isSelected: boolean;
  type: string;
  draw(cursor?: Cursor): void;
  checkCollision(ev: MouseEvent): boolean;
}

export abstract class Shape implements ShapeInterface {
  public id: string;

  constructor(
    protected ctx: CanvasRenderingContext2D | null,
    public type: string
  ) {
    this.id = uuid();
  }

  translate(cursor: Cursor) {
    if (!this.isSelected || !this.options.x || !this.options.y) return;
    console.log("HMF", cursor.current.x - cursor.initial.x);
    
    this.options.x += cursor.current.x - cursor.initial.x;
    this.options.y += cursor.current.y - cursor.initial.y;

    this.draw()
  }
  protected abstract drawSeletionBox(): void;
  abstract isSelected: boolean;
  abstract checkCollision(ev: MouseEvent): boolean;
  abstract options: {
    x?: number;
    y?: number;
  } & Record<string, any>;
  abstract draw(cursor?: Cursor): void;
}
