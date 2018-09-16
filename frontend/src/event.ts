import { State, Plant, Route } from "./state";
import { wrongCommonName, wrongSpecies, wrongFamilyName } from "./checkWrong";
import { Dispatch } from "./context";

export interface Event {
    update: (state: State) => State;
}

const randomInt = (max: number): number =>
    Math.floor(Math.random() * Math.floor(max));

export class LoadPlantsFromServer implements Event {
    constructor(private dispatch: Dispatch) { }

    async process() {
        const response = await fetch("http://web.cecs.pdx.edu/~kowalski/Botany-Quiz/backend.cgi?load");
        const plants = await response.json();
        this.dispatch(new ReceivedPlantsFromServer(this.dispatch, plants));
    }

    update = (state: State): State => {
        this.process();
        return state;
    }
}

export class ReceivedPlantsFromServer implements Event {
    constructor(private dispatch: Dispatch, private plants: Plant[]) { }

    update = (state: State): State => {
        state.plants = this.plants;
        state.allPlants = this.plants.slice(0);
        this.dispatch(new SelectRandomQuestion());
        return state;
    }
}

export class StorePlantsOnServer implements Event {
    async process(plants: Plant[]) {
        const base = "http://web.cecs.pdx.edu/~kowalski/Botany-Quiz/backend.cgi?store=";
        const encoded = btoa(JSON.stringify(plants));
        const response = await fetch(base + encoded);
        const json = await response.json();
        console.log(json);
    }

    update = (state: State): State => {
        this.process(state.allPlants);
        return state;
    }
}

export class ViewSettings implements Event {
    update = (state: State): State => ({ ...state, route: Route.Settings })
}

export class ViewQuiz implements Event {
    update = (state: State): State => ({ ...state, route: Route.Quiz })
}

export class SelectRandomQuestion implements Event {
    update = (state: State): State => {
        if (state.question)
            state.plants.splice(state.question.index, 1);

        if (state.plants.length === 0)
            state.plants = state.allPlants.slice(0);

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