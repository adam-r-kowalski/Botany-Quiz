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

export const question = (index: number): Question =>
    ({
        index,
        commonName: "",
        species: "",
        familyName: "",
        showErrors: false,
        allAnswersCorrect: false
    });

export enum Route { Quiz, Settings };

export interface Notification {
    content: string;
}

export interface State {
    allPlants: Plant[];
    plants: Plant[];
    theme?: Theme;
    question?: Question;
    route: Route;
    notification?: Notification;
}

export const initialState = (): State => ({
    allPlants: [],
    plants: [],
    theme: createMuiTheme(),
    route: Route.Quiz
});