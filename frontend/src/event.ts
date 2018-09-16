import { State, initialState } from "./state";
import { wrongCommonName, wrongSpecies, wrongFamilyName } from "./checkWrong";
import { Dispatch } from "./context";

export interface Event {
    update: (state: State) => State;
}

const randomInt = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));

export class LoadPlantsFromServer implements Event {
    constructor(private dispatch: Dispatch) { }

    update = (state: State): State => {
        fetch("http://web.cecs.pdx.edu/~kowalski/Botany-Quiz/backend.cgi?load")
            .then(r => r.json())
            .then(console.log);
        return state;
    }
}

export class SelectRandomQuestion implements Event {
    update = (state: State): State => {
        if (state.question)
            state.plants.splice(state.question.index, 1);

        if (state.plants.length === 0)
            state = initialState();

        return {
            ...state, question: {
                index: randomInt(state.plants.length),
                commonName: "",
                species: "",
                familyName: "",
                showErrors: false,
                allAnswersCorrect: false
            }
        };
    }
}

export class EditCommonName implements Event {
    constructor(private value: string) { }

    update(state: State): State {
        state.question.commonName = this.value;
        state.question.showErrors = false;
        return state;
    }
}

export class EditSpecies implements Event {
    constructor(private value: string) { }

    update(state: State): State {
        state.question.species = this.value;
        state.question.showErrors = false;
        return state;
    }
}

export class EditFamilyName implements Event {
    constructor(private value: string) { }

    update(state: State): State {
        state.question.familyName = this.value;
        state.question.showErrors = false;
        return state;
    }
}

export class SubmitAnswers implements Event {
    update(state: State): State {
        if (wrongCommonName(state) || wrongSpecies(state) || wrongFamilyName(state))
            state.question.showErrors = true;
        else
            state.question.allAnswersCorrect = true;

        return state;
    }
}

export class ViewCorrectAnswers implements Event {
    update(state: State): State {
        state.question.commonName = state.plants[state.question.index].commonName;
        state.question.species = state.plants[state.question.index].species;
        state.question.familyName = state.plants[state.question.index].familyName;
        return state;
    }
}