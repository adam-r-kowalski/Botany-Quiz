import { Event } from ".";
import { State, question } from "../state";
import { wrongCommonName, wrongSpecies, wrongFamilyName } from "../checkWrong";

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

type RandomIntGenerator = (max: number) => number;

const randomInt: RandomIntGenerator = max =>
    Math.floor(Math.random() * Math.floor(max));

export class SelectRandomQuestion implements Event {
    constructor(private randomIntGenerator: RandomIntGenerator = randomInt) { }

    update = (state: State): State => {
        if (state.question)
            state.plants.splice(state.question.index, 1);

        if (state.plants.length === 0)
            state.plants = state.allPlants.slice(0);

        return { ...state, question: question(this.randomIntGenerator(state.plants.length)) };
    }
}