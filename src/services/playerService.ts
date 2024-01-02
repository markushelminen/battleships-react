import { Boat, Cell } from "../types/types";

export const placeBoat = (cell: Cell, boat: Boat, vertical: boolean, grid: Cell[]) => {
    const nextGrid = [...grid];
    for (let i = 0; i < boat.size; i++) {
        if (vertical) {
            if (cell.number + 10 * (boat.size - 1) > 99) return;
            nextGrid[cell.number + 10 * i].boat = true;
        } else {
            if (cell.number % 10 > 10 - boat.size) return;
            const nextGrid = [...grid];
            nextGrid[cell.number + i].boat = true;
        }
    }
    return nextGrid;
};
export const showBoat = (cell: Cell, boat: Boat, vertical: boolean, grid: Cell[]) => {
    for (let i = 0; i < boat.size; i++) {
        if (vertical) {
            if (cell.number + 10 * (boat.size - 1) > 99) return;
            grid[cell.number + 10 * i].hover = true;
        } else {
            if (cell.number % 10 > 10 - boat.size) return;
            grid[cell.number + i].hover = true;
        }
    }
    return grid;
};

export const hideBoat = (cell: Cell, boat: Boat, vertical: boolean, grid: Cell[]) => {
    for (let i = 0; i < boat.size; i++) {
        if (vertical) {
            if (cell.number + 10 * (boat.size - 1) > 99) return;
            const nextGrid = [...grid];
            nextGrid[cell.number + 10 * i].hover = false;
            return nextGrid;
        } else {
            if (cell.number % 10 > 10 - boat.size) return;
            const nextGrid = [...grid];
            nextGrid[cell.number + i].hover = false;
            return nextGrid;
        }
    }
};
