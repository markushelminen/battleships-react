import { Cell } from "../../types/types";

type CellProps = {
    cell: Cell;
    placeBoat: (cell: Cell) => void;
    showBoat: (cell: Cell) => void;
    hideBoat: (cell: Cell) => void;
};
const PlayerCellComponent = (props: CellProps) => {
    return (
        <div
            className={`
                text-xs text-center w-10 h-10 
                ${props.cell.hover && !props.cell.boat ? "bg-gray-600" : ""}
                ${props.cell.clicked && !props.cell.boat ? "bg-black" : ""}
                ${props.cell.clicked && props.cell.boat ? "crossed" : ""}
                ${props.cell.boat ? "bg-blue-800" : ""}
                `}
            onClick={() => props.placeBoat(props.cell)}
            onMouseEnter={() => props.showBoat(props.cell)}
            onMouseLeave={() => props.hideBoat(props.cell)}
        >
            <p>
                {props.cell.boat ? "1" : "0"} - {props.cell.clicked ? "1" : "0"}
            </p>
            {props.cell.number}
        </div>
    );
};

export default PlayerCellComponent;
