import { Shape } from "./shape";
import { config } from "./stores";
import { Cursor } from "./type";
export interface LineOptions {
  x?: number;
  y?: number;
  endX?: number;
  endY?: number;
  strokeStyle?: string;
  lineWidth?: number;
}
export class Line extends Shape {
  protected drawSeletionBox(): void {
    throw new Error("Method not implemented.");
  }
  public isSelected: boolean = false;

  public options: LineOptions = {
    strokeStyle: "#000000",
    lineWidth: 1,
  };
  constructor(options: LineOptions) {
    super(window.ctx, "line");
    Object.assign(this.options, { ...config, ...options });
    if (!this.options.lineWidth) this.options.lineWidth = this.ctx?.lineWidth;
  }

  checkCollision(_ev: MouseEvent): boolean {
    // const slope =
    //   (this.options.endY! - this.options.y!) /
    //   (this.options.endX! - this.options.x!);
    // const gap = this.options.y! - slope * this.options.x!;
    // console.log(slope, "x+", gap);

    // return slope * ev.offsetX + gap - ev.offsetY === 0;
    return false;
  }
  draw(cursor?: Cursor) {
    if (!this.ctx) return;
    if (cursor) {
      this.options.x = cursor.initial.x;
      this.options.y = cursor.initial.y;

      this.options.endX = cursor.current.x;
      this.options.endY = cursor.current.y;
    }
    if (!this.ctx) return;
    this.ctx.beginPath();
    this.ctx.moveTo(this.options.x!, this.options.y!);
    this.ctx.lineTo(this.options.endX!, this.options.endY!);
    this.ctx.strokeStyle = this.options.strokeStyle!;
    this.ctx.lineWidth = this.options.lineWidth!;
    this.ctx.stroke();
  }
}
