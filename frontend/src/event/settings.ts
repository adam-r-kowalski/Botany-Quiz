import { Event } from ".";
import { State } from "../state";

export class EditImage implements Event {
    constructor(private value: string, private index: number) { }

    update(state: State): State {
        state.allPlants[this.index].image = this.value;
        return state;
    }
}

export class EditCommonName implements Event {
    constructor(private value: string, private index: number) { }

    update(state: State): State {
        state.allPlants[this.index].commonName = this.value;
        return state;
    }
}

export class EditSpecies implements Event {
    constructor(private value: string, private index: number) { }

    update(state: State): State {
        state.allPlants[this.index].species = this.value;
        return state;
    }
}

export class EditFamilyName implements Event {
    constructor(private value: string, private index: number) { }

    update(state: State): State {
        state.allPlants[this.index].familyName = this.value;
        return state;
    }
}

export class DeletePlant implements Event {
    constructor(private index: number) { }

    update(state: State): State {
        state.allPlants.splice(this.index, 1);
        return state;
    }
}