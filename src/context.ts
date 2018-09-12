import * as React from "react";

import { State, initialState } from "./state";
import { Event } from "./event";

export type Dispatch = (event: Event) => void;

export interface Context {
    dispatch: Dispatch;
    state: State;
}

const { Consumer, Provider } = React.createContext<Context>({
    dispatch: console.log,
    state: initialState
})

export { Consumer, Provider };
