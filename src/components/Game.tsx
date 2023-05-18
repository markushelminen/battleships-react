import { useEffect, useState } from "react";
import GridComponent from "./Grid";
import { Grid } from "../types/types";

const GameComponent = () => {
  const [playerGrid, setPlayerGrid] = useState<Grid>([]);
  const [computerGrid, setComputerGrid] = useState<Grid>([]);

  useEffect(() => {
    const tempPlayerGrid: Grid = [];
    const tempComputerGrid: Grid = [];
    for (let i = 0; i < 100; i++) {
      tempComputerGrid.push({
        boat: false,
        clicked: false,
        number: i,
      });
      tempPlayerGrid.push({
        boat: false,
        clicked: false,
        number: i,
      });
    }
    setComputerGrid(tempComputerGrid);
    setPlayerGrid(tempPlayerGrid);
  }, []);

  return (
    <>
      <label htmlFor="vertical">Vertical</label>
      <input type="checkbox" name="vertical" />
      Game
      <GridComponent grid={playerGrid} player={true}></GridComponent>
      <GridComponent grid={computerGrid} player={false}></GridComponent>
    </>
  );
};

export default GameComponent;
