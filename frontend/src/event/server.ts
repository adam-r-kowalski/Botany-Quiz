import { Event } from ".";
import { Dispatch } from "../context";
import { State, Plant, newPlant } from "../state";
import { SelectRandomQuestion } from "./quiz";

type RemoteRequest<T> = (url: string) => Promise<T>;

async function fetchRemoteRequest<T>(url: string): Promise<T> {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

export interface Status {
    status: boolean;
};

const backend = "https://web.cecs.pdx.edu/~kowalski/Botany-Quiz/backend.cgi";

export class LoadPlants implements Event {
    constructor(private dispatch: Dispatch,
        private remoteRequest: RemoteRequest<Plant[]> = fetchRemoteRequest) { }

    async process() {
        const plants = await this.remoteRequest(`${backend}?load`);
        this.dispatch(new ReceivedPlants(this.dispatch, plants));
    }

    update = (state: State): State => {
        this.process();
        return state;
    }
}

export class ReceivedPlants implements Event, Iterator<Plant> {
    public length: number;
    private index = 0;

    constructor(private dispatch: Dispatch, private plants: Plant[] = []) {
        this.length = plants.length;
    }

    update = (state: State): State => {
        state.plants = this.plants;
        state.allPlants = this.plants.slice(0);
        this.dispatch(new SelectRandomQuestion());
        return state;
    }

    public next(): IteratorResult<Plant> {
        return this.index < this.length ?
            {
                done: false,
                value: this.plants[this.index]
            } :
            { done: true, value: newPlant(0) };
    }
}

export class StorePlants implements Event {
    constructor(private dispatch: Dispatch,
        private remoteRequest: RemoteRequest<Status> = fetchRemoteRequest) { }

    async process(plants: Plant[]) {
        const encoded = btoa(JSON.stringify(plants));
        await this.remoteRequest(`${backend}?store=${encoded}`);
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