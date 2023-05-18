export type Grid = Cell[];

export type Cell = {
  boat: boolean;
  clicked: boolean;
  number: number;
  hover?: boolean;
};

export type Boat = {
  name: string;
  size: number;
  vertical: boolean;
};
