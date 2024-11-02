import { Shape } from "./shape";
import { config } from "./stores";
import { Cursor } from "./type";
export interface RectangleOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fillColor?: string;
  strokeStyle?: string;
  lineWidth?: number;
}
export class Rectangle extends Shape {
  public options: RectangleOptions = {
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    fillColor: "transparent",
    lineWidth: 1,
    strokeStyle: "red",
  };

  isSelected: boolean;

  constructor(options: RectangleOptions) {
    super(window.ctx, "rectangle");

    this.isSelected = true;
    Object.assign(this.options, { ...config, ...options });
  }

  draw(cursor?: Cursor) {
    if (!this.ctx) return;
    if (cursor) {
      this.options.x = cursor.initial.x;
      this.options.y = cursor.initial.y;

      this.options.width = cursor.current.x - cursor.initial.x;
      this.options.height = cursor.current.y - cursor.initial.y;
    }

    this.ctx.beginPath();

    this.ctx.strokeStyle = this.options.strokeStyle ?? "#000000";
    this.ctx.fillStyle = this.options.fillColor ?? "transparent";
    this.ctx.lineWidth = this.options.lineWidth ?? 1;
    //Pour dessiner
    this.ctx.roundRect(
      this.options.x!,
      this.options.y!,
      this.options.width!,
      this.options.height!,
      4
    );
    this.ctx.fill();
    this.ctx.stroke();

    if (this.isSelected) {
      this.drawSeletionBox();
    }
  }

  drawSeletionBox() {
    if (!this.ctx) return;

    const offset = 6;
    this.ctx.strokeStyle = "#8884f5";

    this.ctx.roundRect(
      this.options.x! - offset,
      this.options.y! - offset,
      this.options.width! + offset * 2,
      this.options.height! + offset * 2,
      8
    );
    this.ctx.stroke();
  }
  checkCollision(ev: MouseEvent): boolean {
    const spaceLeft = 4;
    const position = {
      a: [this.options.x!, this.options.y!],
      b: [this.options.x! + this.options.width!, this.options.y!],
      c: [
        this.options.x! + this.options.width!,
        this.options.height! + this.options.y!,
      ],
      d: [this.options.x!, this.options.height! + this.options.y!],
    };

    if (this.isSelected) {
      if (
        position.a[0] <= ev.offsetX &&
        ev.offsetX <= position.b[0] &&
        position.a[1] < ev.offsetY &&
        ev.offsetY < position.d[1]
      )
        return true;
    }
    if (
      position.a[0] < ev.offsetX &&
      ev.offsetX < position.b[0] &&
      (Math.abs(ev.offsetY - position.a[1]) <= spaceLeft ||
        Math.abs(ev.offsetY - position.d[1]) <= spaceLeft)
    )
      return true;

    if (
      position.a[1] < ev.offsetY &&
      ev.offsetY < position.d[1] &&
      (Math.abs(ev.offsetX - position.a[0]) <= spaceLeft ||
        Math.abs(ev.offsetX - position.b[0]) <= spaceLeft)
    )
      return true;

    return false;
  }
}
