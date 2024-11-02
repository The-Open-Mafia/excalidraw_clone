export type Ref<T> = {
  value: T;
  effects: ((newValue: T) => void)[];
  subscribe: (fn: (newValue: T) => void) => void;
};

export enum Action {
  RECTANGLE = "RECTANGLE",
  LINE = "LINE",
  FREEDRAW = "FREEDRAW",
}

export interface Position {
  x: number;
  y: number;
}

export interface Cursor {
  initial: Position;
  current: Position;
  type?: "pencil" | "cross";
}
// export type Shape = {
//   id: string;
//   strokeColor?: string;
//   lineWidth?: number;
// } & (
//   | {
//       type: "line";
//       startX: number;
//       startY: number;
//       endX: number;
//       endY: number;
//     }
//   | {
//       type: "rectangle";
//       x: number;
//       y: number;
//       width: number;
//       height: number;
//       fillColor?: string;
//     }
// );
