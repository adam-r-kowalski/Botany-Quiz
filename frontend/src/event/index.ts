import { State } from "../state";

export interface Event {
    update: (state: State) => State;
}
