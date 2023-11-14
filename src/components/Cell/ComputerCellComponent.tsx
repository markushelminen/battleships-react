import { useContext } from "react";
import GameContext from "../../services/context";
import { Cell } from "../../types/types";

type CellProps = {
    cell: Cell;
    clickCell: (cell: Cell) => void;
};
const ComputerCellComponent = (props: CellProps) => {
    const game = useContext(GameContext);

    const handleClick = () => {
        if (!game.hasStarted) return;
        props.clickCell(props.cell);
    };
    return (
        <div
            className={`text-xs text-center w-10 h-10  
            ${game.hasStarted ? "hover:bg-blue-800" : ""}
            ${props.cell.boat && props.cell.clicked ? "crossed " : ""}
            ${!props.cell.boat && props.cell.clicked ? "bg-black" : ""}
            `}
            onClick={handleClick}
        >
            <p>
                {props.cell.boat ? "1" : "0"} - {props.cell.clicked ? "1" : "0"}
            </p>
            {props.cell.number}
        </div>
    );
};

export default ComputerCellComponent;
