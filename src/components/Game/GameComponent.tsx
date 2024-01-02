import { useContext } from "react";
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

    let playerGrid: Grid = makeEmptyGrid();
    let computerGrid: Grid = getEnemyFleet();

    const shotsLanded = 0;
    const lastShotLandedCount = 0;
    let firstBoatCell = 0;
    let orientationCounter = 0;

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
        playerGrid = makeEmptyGrid();
        computerGrid = getEnemyFleet();
    };

    const shootPlayer = () => {
        if (orientationCounter === 0 && lastShotLandedCount === 0) {
            firstBoatCell = -1;
        }
        let firedCellNumber;
        [firedCellNumber, orientationCounter] = computerCellToShoot(
            playerGrid,
            shotsLanded,
            lastShotLandedCount,
            firstBoatCell,
            orientationCounter
        );
        console.log("Number: " + firedCellNumber);
    };

    return (
        <>
            <div className="flex justify-center">
                <PlayerGridComponent start={startGame} grid={playerGrid}></PlayerGridComponent>
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
