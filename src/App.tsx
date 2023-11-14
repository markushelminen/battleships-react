import { useState } from "react";
import GameComponent from "./components/Game/GameComponent";
import GameContext from "./services/context";
import { Game } from "./types/types";

function App() {
    const [game, setGame] = useState<Game>({ hasStarted: false, vertical: false });
    return (
        <div className=" flex flex-col p-5 bg-blue-400 h-screen">
            <h1 className="text-2xl text-gray-900 p-3 text-center">Battleship</h1>
            <i className="text-gray-800 p-1 text-center">a thesis by Markus Helminen</i>
            <GameContext.Provider value={game}>
                <GameComponent updateGame={setGame}></GameComponent>
            </GameContext.Provider>
        </div>
    );
}

export default App;
