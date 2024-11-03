import { Shape } from "./shape";
import { config } from "../../stores";
import { Cursor } from "../type";
export interface LineOptions {
  x?: number;
  y?: number;
  endX?: number;
  endY?: number;
  strokeStyle?: string;
  lineWidth?: number;
}
export class Line extends Shape {
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

  protected drawSeletionBox(): void {
    if (!this.ctx) return;

    const offset = 6;
    this.ctx.strokeStyle = "#8884f5";

    this.ctx.roundRect(
      this.options.x! - offset,
      this.options.y! - offset,

      Math.abs(this.options.x! - this.options.endX!) + offset * 2,
      Math.abs(this.options.y! - this.options.endY!) + offset * 2,
      8,
    );
    this.ctx.stroke();
  }

  translate(x: number, y: number) {
    if (!this.isSelected) return;
    const gapX = Math.abs(this.options.x! - this.options.endX!);
    const gapY = Math.abs(this.options.y! - this.options.endY!);
    this.options.x = x;
    this.options.y = y;

    this.options.endX = x + gapX;
    this.options.endY = y + gapY;
    this.draw();
  }

  checkCollision(ev: MouseEvent): boolean {
    const minimumGap = 14;
    // TODO wtf i don't even understand
    // Check if the line is almost straight
    if (
      Math.abs(this.options.x! - this.options.endX!) < minimumGap ||
      Math.abs(this.options.y! - this.options.endY!) < minimumGap
    )
      return (
        Math.abs(this.options.x! - ev.offsetX) < minimumGap / 2 ||
        Math.abs(this.options.y! - ev.offsetY) < minimumGap / 2
      );
    // Check mouse is on the rect created by the line

    return (
      this.options.x! < ev.offsetX &&
      ev.offsetX < this.options.endX! &&
      this.options.y! < ev.offsetY &&
      ev.offsetY < this.options.endY!
    );
    // const slope =
    //   (-this.options.endY! + this.options.y!) /
    //   (this.options.endX! - this.options.x!);
    // const gap = this.options.y! - slope * this.options.x!;
    // console.log(slope, "x+", gap);

    // return slope * ev.offsetX + gap + ev.offsetY === 0;
    // return false;
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

    if (this.isSelected) {
      this.drawSeletionBox();
    }
  }
}
