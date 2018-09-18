import { Event } from ".";
import { State } from "../state";
import { Dispatch } from "../context";
import { NeedsSaving } from "./server";

const boundsCheck = (index: number, state: State): boolean =>
    index >= state.allPlants.length;

export class EditImage implements Event {
    constructor(private dispatch: Dispatch,
        private value: string, private index: number) { }

    update(state: State): State {
        if (boundsCheck(this.index, state)) return state;
        state.allPlants[this.index].image = this.value;
        this.dispatch(new NeedsSaving(this.dispatch));
        return state;
    }
}

export class EditCommonName implements Event {
    constructor(private dispatch: Dispatch,
        private value: string, private index: number) { }

    update(state: State): State {
        if (boundsCheck(this.index, state)) return state;
        state.allPlants[this.index].commonName = this.value;
        this.dispatch(new NeedsSaving(this.dispatch));
        return state;
    }
}

export class EditSpecies implements Event {
    constructor(private dispatch: Dispatch,
        private value: string, private index: number) { }

    update(state: State): State {
        if (boundsCheck(this.index, state)) return state;
        state.allPlants[this.index].species = this.value;
        this.dispatch(new NeedsSaving(this.dispatch));
        return state;
    }
}

export class EditFamilyName implements Event {
    constructor(private dispatch: Dispatch,
        private value: string, private index: number) { }

    update(state: State): State {
        if (boundsCheck(this.index, state)) return state;
        state.allPlants[this.index].familyName = this.value;
        this.dispatch(new NeedsSaving(this.dispatch));
        return state;
    }
}

export class DeletePlant implements Event {
    constructor(private index: number) { }

    update(state: State): State {
        state.allPlants.splice(this.index, 1);
        state.plants = state.allPlants.slice(0);
        return state;
    }
}