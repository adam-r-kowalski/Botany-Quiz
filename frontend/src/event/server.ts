import { Event } from ".";
import { Dispatch } from "../context";
import { State, Plant } from "../state";
import { SelectRandomQuestion } from "./quiz";

export class LoadPlants implements Event {
    constructor(private dispatch: Dispatch) { }

    async process() {
        const response = await fetch("http://web.cecs.pdx.edu/~kowalski/Botany-Quiz/backend.cgi?load");
        const plants = await response.json();
        this.dispatch(new ReceivedPlants(this.dispatch, plants));
    }

    update = (state: State): State => {
        this.process();
        return state;
    }
}

export class ReceivedPlants implements Event {
    constructor(private dispatch: Dispatch, private plants: Plant[]) { }

    update = (state: State): State => {
        state.plants = this.plants;
        state.allPlants = this.plants.slice(0);
        this.dispatch(new SelectRandomQuestion());
        return state;
    }
}

export class StorePlants implements Event {
    constructor(private dispatch: Dispatch) { }

    async process(plants: Plant[]) {
        const base = "http://web.cecs.pdx.edu/~kowalski/Botany-Quiz/backend.cgi?store=";
        const encoded = btoa(JSON.stringify(plants));
        const response = await fetch(base + encoded);
        await response.json();
        this.dispatch(new StoredPlants());
    }

    update = (state: State): State => {
        this.process(state.allPlants);
        return state;
    }
}

export class StoredPlants implements Event {
    update = (state: State): State =>
        ({ ...state, notification: { content: "Plants saved!" } })
}