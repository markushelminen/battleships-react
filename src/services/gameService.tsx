import { Boat, Grid } from "../types/types";

export const boats: Boat[] = [
    {
        name: "patrol boat",
        size: 2,
        vertical: false,
    },
    {
        name: "submarine",
        size: 3,
        vertical: false,
    },
    {
        name: "destroyer",
        size: 3,
        vertical: false,
    },
    {
        name: "battleship",
        size: 4,
        vertical: false,
    },
    {
        name: "aircraft carrier",
        size: 5,
        vertical: false,
    },
];

export function makeEmptyGrid() {
    const grid: Grid = [];
    for (let i = 0; i < 100; i++) {
        grid.push({
            boat: false,
            clicked: false,
            number: i,
            hover: false,
        });
    }
    return grid;
}
