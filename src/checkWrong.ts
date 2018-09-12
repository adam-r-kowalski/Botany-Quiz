import { State } from "./state";

const isWrong = (received: string, expected: string): boolean =>
    received.toLowerCase() != expected.toLowerCase();

export const wrongCommonName = (state: State): boolean => {
    if (!state.question.showErrors) return false;
    const received = state.question.commonName;
    const expected = state.plants[state.question.index].commonName;
    return isWrong(received, expected);
}

export const wrongSpecies = (state: State): boolean => {
    if (!state.question.showErrors) return false;
    const received = state.question.species;
    const expected = state.plants[state.question.index].species;
    return isWrong(received, expected);
}

export const wrongFamilyName = (state: State): boolean => {
    if (!state.question.showErrors) return false;
    const received = state.question.familyName;
    const expected = state.plants[state.question.index].familyName;
    return isWrong(received, expected);
}