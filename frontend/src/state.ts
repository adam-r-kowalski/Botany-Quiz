import { Theme, createMuiTheme } from "@material-ui/core/styles";

export interface Plant {
    commonName: string;
    species: string;
    familyName: string;
    image: string;
}

export interface Question {
    index: number;
    commonName: string;
    species: string;
    familyName: string;
    showErrors: boolean;
    allAnswersCorrect: boolean;
}

export interface State {
    allPlants: Plant[];
    plants: Plant[];
    theme: Theme;
    question?: Question;
}

export const initialState = (): State => ({
    allPlants: [],
    plants: [],
    theme: createMuiTheme()
});
