import { useState } from "react";
import { Cell, Grid } from "../../types/types";
import ComputerCellComponent from "../Cell/ComputerCellComponent";

type GridProps = {
    grid: Grid;
    shootPlayer: () => void;
};

const ComputerGridComponent = (props: GridProps) => {
    const [grid, setGrid] = useState<Grid>(props.grid);
    const clickCell = (cell: Cell) => {
        const nextGrid = [...grid];
        nextGrid[cell.number].clicked = true;
        setGrid(nextGrid);
        props.shootPlayer();
    };
    return (
        <div>
            <h2 className="text-center text-lg pb-2">Computer</h2>
            <div className="grid grid-cols-10 border border-gray-900">
                {grid &&
                    grid.map((cell: Cell) => {
                        return (
                            <ComputerCellComponent
                                key={cell.number}
                                cell={cell}
                                clickCell={clickCell}
                            ></ComputerCellComponent>
                        );
                    })}
            </div>
        </div>
    );
};

export default ComputerGridComponent;
