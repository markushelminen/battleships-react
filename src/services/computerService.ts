import { Boat, Grid } from "../types/types";
import { boats, makeEmptyGrid } from "./gameService";

export function getEnemyFleet() {
    let enemyGrid = makeEmptyGrid();

    for (let i = 0; i < boats.length; i++) {
        enemyGrid = placeBoat(boats[boats.length - 1 - i], enemyGrid);
    }
    return enemyGrid;
}

function placeBoat(boat: Boat, grid: Grid) {
    boat.vertical = Math.random() > 0.5 ? true : false;
    const cellNumber = randomCell(boat, grid);

    if (boat.vertical) {
        for (let i = 0; i < boat.size; i++) {
            grid[cellNumber + i * 10].boat = true;
        }
    } else {
        for (let i = 0; i < boat.size; i++) {
            grid[cellNumber + i].boat = true;
        }
    }
    return grid;
}

function randomCell(boat: Boat, grid: Grid): number {
    let illegalPlacement = true;
    let randomCellNumber = 0;
    while (illegalPlacement) {
        randomCellNumber = randomIntFromInterval(1, 99);
        if (boat.vertical) {
            if (randomCellNumber + (boat.size - 1) * 10 < 99) {
                for (let j = 0; j < boat.size; j++) {
                    if (randomCellNumber + 10 * j <= 99) {
                        if (grid[randomCellNumber + j * 10].boat === false) {
                            illegalPlacement = false;
                        } else {
                            illegalPlacement = true;
                            break;
                        }
                    }
                }
            }
        } else {
            if (randomCellNumber + boat.size - 1 <= 99) {
                if ((randomCellNumber + boat.size - 1) % 10 > boat.size) {
                    for (let k = 0; k < boat.size; k++) {
                        if (grid[randomCellNumber + k].boat === false) {
                            illegalPlacement = false;
                        } else {
                            illegalPlacement = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    return randomCellNumber;
}

export function computerCellToShoot(
    grid: Grid,
    shotsLanded: number,
    lastShotCell: number,
    firstBoatCell: number,
    orientationCounter: number
) {
    console.log(
        `shots landed: ${shotsLanded}, last shot shell: ${lastShotCell}, first boat cell shot: ${firstBoatCell}, orientation counter: ${orientationCounter}`
    );
    let cellToShoot = 0;
    if (shotsLanded !== 0 || orientationCounter !== 0) {
        [cellToShoot, orientationCounter] = getNextOrientationCell(
            grid,
            lastShotCell,
            firstBoatCell,
            orientationCounter
        );
    } else {
        orientationCounter = 0;
        cellToShoot = randomCellToShoot(grid);
    }
    return [cellToShoot, orientationCounter];
}

function randomCellToShoot(grid: Grid): number {
    let cell = NaN;
    let shotValid = false;
    while (!shotValid) {
        cell = randomIntFromInterval(0, 99);
        // Computer shoots only everyother cell to be efficient
        if (cell % 2 === 0) cell + 1;
        if (grid[cell].clicked === false) {
            shotValid = true;
        }
    }
    return cell;
}

function getNextOrientationCell(
    grid: Grid,
    lastShotCell: number,
    firstBoatCell: number,
    orientationCounter: number
): number[] {
    let cell = NaN;
    switch (orientationCounter) {
        case 1:
            cell = lastShotCell - 10;
            break;
        case 2:
            cell = lastShotCell + 10;
            break;
        case 3:
            cell = lastShotCell - 1;
            break;
        case 4:
            cell = lastShotCell + 1;
            break;

        default:
            orientationCounter = 0;
            return [randomCellToShoot(grid), orientationCounter];
    }
    if (grid[cell] && grid[cell].clicked === false) {
        return [cell, orientationCounter];
    }
    orientationCounter++;
    return getNextOrientationCell(grid, lastShotCell, firstBoatCell, orientationCounter);
}

function shootRestOfTheBoat(
    grid: Grid,
    lastShotCell: number,
    firstBoatCell: number,
    orientationCounter: number
): number {
    const offset = getOffset(orientationCounter);
    if (grid[lastShotCell + offset] && grid[lastShotCell + offset].clicked == false) {
        return lastShotCell + offset;
    } else if (grid[lastShotCell + offset].clicked == true) {
        return shootRestOfTheBoat(grid, lastShotCell + offset, firstBoatCell, orientationCounter);
    } else {
        return 69;
    }
}

function getOffset(orientationCounter: number) {
    switch (orientationCounter) {
        case 1:
            return 10;
        case 2:
            return -10;
        case 3:
            return 1;
        case 4:
            return -1;
        default:
            return NaN;
    }
}

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
