import { Shape } from "./shape";
import { config } from "./stores";
import { Cursor } from "./type";
export interface LineOptions {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  strokeStyle?: string;
  lineWidth?: number;
}
export class Line extends Shape {
  public options: LineOptions = {
    strokeStyle: "#000000",
    lineWidth: 1,
  };
  constructor(options: LineOptions) {
    super(window.ctx, "line");
    Object.assign(this.options, { ...config, ...options });
    if (!this.options.lineWidth) this.options.lineWidth = this.ctx?.lineWidth;
  }

  draw(cursor?: Cursor) {
    if (!this.ctx) return;
    if (cursor) {
      this.options.startX = cursor.initial.x;
      this.options.startY = cursor.initial.y;

      this.options.endX = cursor.current.x;
      this.options.endY = cursor.current.y;
    }
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.moveTo(this.options.startX!, this.options.startY!);
    this.ctx.lineTo(this.options.endX!, this.options.endY!);
    this.ctx.strokeStyle = this.options.strokeStyle!;
    this.ctx.lineWidth = this.options.lineWidth!;
    this.ctx.stroke();
  }
}
