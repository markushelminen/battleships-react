import { useContext, useEffect, useState } from "react";
import { boats } from "../../services/gameService";
import { Cell, Grid } from "../../types/types";
import PlayerCellComponent from "../Cell/PlayerCellComponent";
import GameContext from "../../services/context";
import { placeBoat } from "../../services/playerService";

type GridProps = {
    grid: Grid;
    start: () => void;
    updateGrid: (x: Grid) => void;
};

const PlayerGridComponent = (props: GridProps) => {
    const grid = props.grid;
    const [boatCounter, setBoatCounter] = useState<number>(boats.length - 1);
    const game = useContext(GameContext);

    const placeBoatGrid = (cell: Cell) => {
        if (!game.hasStarted && boatCounter !== -1) {
            const boat = boats[boatCounter];
            const nextGrid = placeBoat(cell, boat, game.vertical, grid);
            if (!nextGrid) return;
            props.updateGrid(nextGrid);
            setBoatCounter(boatCounter - 1);
        }
    };
    const showBoat = (cell: Cell) => {
        if (!game.hasStarted && boatCounter !== -1) {
            const boat = boats[boatCounter];
            for (let i = 0; i < boat.size; i++) {
                if (game.vertical) {
                    if (cell.number + 10 * (boat.size - 1) > 99) return;
                    const nextGrid = [...grid];
                    nextGrid[cell.number + 10 * i].hover = true;
                    props.updateGrid(nextGrid);
                } else {
                    if (cell.number % 10 > 10 - boat.size) return;
                    const nextGrid = [...grid];
                    nextGrid[cell.number + i].hover = true;
                    props.updateGrid(nextGrid);
                }
            }
        }
    };

    const hideBoat = (cell: Cell) => {
        if (!game.hasStarted && boatCounter !== -1) {
            const boat = boats[boatCounter];
            for (let i = 0; i < boat.size; i++) {
                if (game.vertical) {
                    if (cell.number + 10 * (boat.size - 1) > 99) return;
                    const nextGrid = [...grid];
                    nextGrid[cell.number + 10 * i].hover = false;
                    props.updateGrid(nextGrid);
                } else {
                    if (cell.number % 10 > 10 - boat.size) return;
                    const nextGrid = [...grid];
                    nextGrid[cell.number + i].hover = false;
                    props.updateGrid(nextGrid);
                }
            }
        }
    };

    useEffect(() => {
        if (boatCounter === -1) props.start();
    }, [boatCounter]);
    return (
        <div>
            <h2 className="text-center text-lg pb-2">Player</h2>
            <div className="grid grid-cols-10 bg-blue-300  border border-gray-900">
                {grid &&
                    grid.map((cell: Cell) => {
                        return (
                            <PlayerCellComponent
                                key={cell.number}
                                cell={cell}
                                showBoat={showBoat}
                                hideBoat={hideBoat}
                                placeBoat={placeBoatGrid}
                            ></PlayerCellComponent>
                        );
                    })}
            </div>
        </div>
    );
};

export default PlayerGridComponent;
