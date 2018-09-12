import { State } from "./state";

export interface Event {
    update: (state: State) => State;
}

const randomInt = (max: number): number  =>
    Math.floor(Math.random() * Math.floor(max));

export class SelectRandomQuestion implements Event {
    update = (state: State): State =>
        ({ ...state, question: {
            index: randomInt(state.plants.length),
            commonName: "",
            species: "",
            familyName: ""
        } })
}