import { Rectangle } from "./rectangle";
import { Shape } from "./shape";
import { config } from "../../stores";
import { Cursor } from "../type";
export interface PencilOptions {
  x: number;
  y: number;
  height: number;
  width: number;
  points: [number, number][];
  strokeStyle: string;
  lineWidth: number;
}
export class Pencil extends Shape {
  public isSelected: boolean = false;
  public minX: number = 0;
  public minY: number = 0;
  public maxX: number = 0;
  public maxY: number = 0;

  public options: PencilOptions = {
    strokeStyle: "#000000",
    lineWidth: 1,
    points: [],
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  };
  constructor(options: Partial<PencilOptions>) {
    super(window.ctx, "pencil");

    Object.assign(this.options, { ...config, ...options });
  }

  protected drawSeletionBox(): void {
    const rect = new Rectangle({
      x: this.minX + this.options.x,
      y: this.minY + this.options.y,
      width: this.options.width,
      height: this.options.height,
      strokeStyle: "#8884f5",
      fillColor: "transparent",
    });
    rect.draw();
  }

  checkCollision(ev: MouseEvent): boolean {
    if (this.isSelected) {
      this.containerRect.isSelected = true;
      return this.containerRect.checkCollision(ev);
    }

    const spaceLeft = Math.max(this.options.lineWidth, 4);
    return this.options.points.some(
      ([x, y]) =>
        Math.abs(x + this.options.x - ev.offsetX) <= spaceLeft &&
        Math.abs(y + this.options.y - ev.offsetY) <= spaceLeft,
    );
  }
  draw(cursor?: Cursor) {
    if (!this.ctx) return;
    if (cursor) {
      this.options.x = cursor.initial.x;
      this.options.y = cursor.initial.y;

      this.options.width = cursor.current.x - cursor.initial.x;
      this.options.height = cursor.current.y - cursor.initial.y;
      cursor.type = "pencil";
    }

    this.ctx.beginPath();

    this.ctx.strokeStyle = this.options.strokeStyle;
    this.ctx.lineWidth = this.options.lineWidth;
    this.ctx.lineCap = "round"; // Smoother line endings

    // Move to the first point
    this.ctx.moveTo(
      this.options.points[0][0] + this.options.x,
      this.options.points[0][1] + this.options.y,
    );

    // Draw lines to subsequent points
    for (let i = 1; i < this.options.points.length; i++) {
      const [x, y] = this.options.points[i];

      if (this.maxY < Math.abs(y)) this.maxY = Math.abs(y);
      if (this.maxX < Math.abs(x)) this.maxX = Math.abs(x);
      if (this.minY > y) this.minY = y;
      if (this.minX > x) this.minX = x;
      this.ctx.lineTo(x + this.options.x, y + this.options.y);
    }

    this.options.width = this.maxX - this.minX;
    this.options.height = this.maxY - this.minY;

    // Stroke the path
    this.ctx.stroke();

    if (this.isSelected) {
      this.drawSeletionBox();
    }
  }
  get containerRect() {
    const rect = new Rectangle({
      x: this.minX + this.options.x,
      y: this.minY + this.options.y,
      width: this.options.width,
      height: this.options.height,
      strokeStyle: "#8884f5",
      lineWidth: 1,
    });
    rect.isSelected = true;
    return rect;
  }
}
