import { Cell, Grid } from "../types/types";

type GridProps = {
  grid: Grid;
  player: boolean;
};

const GridComponent = (props: GridProps) => {
  return (
    <>
      {props.grid.map((x: Cell) => {
        <div>{x.number}</div>;
      })}
    </>
  );
};

export default GridComponent;
