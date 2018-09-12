import { State } from "./state";
import { TableFooter } from "@material-ui/core";

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
            familyName: "",
            showErrors: false
        } })
}

export class EditCommonName implements Event {
    constructor(private value: string) {}

    update(state: State): State {
        state.question.commonName = this.value;
        state.question.showErrors = false;
        return state;
    }
}


export class EditSpecies implements Event {
    constructor(private value: string) {}

    update(state: State): State {
        state.question.species = this.value;
        state.question.showErrors = false;
        return state;
    }
}

export class EditFamilyName implements Event {
    constructor(private value: string) {}

    update(state: State): State {
        state.question.familyName = this.value;
        state.question.showErrors = false;
        return state;
    }
}

export class SubmitAnswers implements Event {
    update(state: State): State {
        state.question.showErrors = true;
        return state;
    }
}

export class ViewCorrectAnswers implements Event {
    update(state: State): State {
        console.log("Viewing!")
        return state;
    }
}