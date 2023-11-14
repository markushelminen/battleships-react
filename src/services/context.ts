import { createContext } from "react";
import { Game } from "../types/types";

const GameContext = createContext<Game>({ hasStarted: false, vertical: false });
export default GameContext;
