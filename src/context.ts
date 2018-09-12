import * as React from "react";

import { State, initialState } from "./state";
import { Event } from "./event";

export interface Context {
    dispatch: (event: Event) => void;
    state: State;
}

const { Consumer, Provider } = React.createContext<Context>({
    dispatch: console.log,
    state: initialState
})

export { Consumer, Provider };
