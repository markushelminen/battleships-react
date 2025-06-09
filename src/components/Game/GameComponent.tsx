import { useContext, useState } from "react";
import { Game, Grid } from "../../types/types";
import PlayerGridComponent from "../Grid/PlayerGridComponent";
import ComputerGridComponent from "../Grid/ComputerGridComponent";
import { makeEmptyGrid } from "../../services/gameService";
import { computerCellToShoot, getEnemyFleet } from "../../services/computerService";
import GameContext from "../../services/context";

type GameProps = {
    updateGame: (game: Game) => void;
};

const GameComponent = (props: GameProps) => {
    const game = useContext(GameContext);

    const [playerGrid, setPlayerGrid] = useState<Grid>(makeEmptyGrid());
    let computerGrid: Grid = getEnemyFleet();

    let shotsLanded = 0;
    let lastShotLandedCount = 0;
    let firstBoatCell = 0;
    let orientationCounter = 0;
    let lastShotCell = -1;

    const handleVerticalChange = () => {
        props.updateGame({
            hasStarted: game.hasStarted,
            vertical: !game.vertical,
        });
    };

    const startGame = () => {
        props.updateGame({
            hasStarted: true,
            vertical: game.vertical,
        });
    };

    const reset = () => {
        props.updateGame({
            hasStarted: false,
            vertical: game.vertical,
        });
        setPlayerGrid(makeEmptyGrid());
        computerGrid = getEnemyFleet();
    };

    const shootPlayer = () => {
        if (orientationCounter === 0 && lastShotLandedCount === 0) {
            firstBoatCell = -1;
        }
        let firedCellNumber = -1;
        [firedCellNumber, orientationCounter] = computerCellToShoot(
            playerGrid,
            shotsLanded,
            lastShotLandedCount,
            firstBoatCell,
            orientationCounter
        );
        lastShotCell = firedCellNumber;
        console.log("Number: " + firedCellNumber);

        updatePlayer(firedCellNumber);

        if (playerGrid[firedCellNumber].boat === true) {
            if (orientationCounter === 0) {
                orientationCounter = 1;
                firstBoatCell = firedCellNumber;
            }
            lastShotLandedCount++;
            shotsLanded++;
            lastShotCell = firedCellNumber;
        } else {
            lastShotLandedCount = 0;
        }
        // computerFiredShots.push(firedCellNumber);
        // dispatch("isgameover")
    };

    function updatePlayer(cellNumber: number) {
        const newGrid = [...playerGrid];
        newGrid[cellNumber].clicked = true;
        setPlayerGrid(newGrid);
    }

    function updateGrid(newGrid: Grid) {
        setPlayerGrid(newGrid);
    }

    return (
        <>
            <div className="flex justify-center">
                <PlayerGridComponent start={startGame} updateGrid={updateGrid} grid={playerGrid}></PlayerGridComponent>
                <section className="flex flex-col gap-4 m-2">
                    <p>Place Your Boats</p>
                    <div className="flex items-center">
                        <label htmlFor="vertical">Vertical</label>
                        <div className="p-1"></div>
                        <input onChange={handleVerticalChange} type="checkbox" id="vertical" />
                    </div>
                    {game.hasStarted ? (
                        <button onClick={reset}>Reset</button>
                    ) : (
                        <button className="bg-cyan-600 hover:bg-cyan-700 rounded-lg py-2 px-4 text-white">Start</button>
                    )}
                </section>
                <ComputerGridComponent shootPlayer={shootPlayer} grid={computerGrid}></ComputerGridComponent>
            </div>
        </>
    );
};

export default GameComponent;
