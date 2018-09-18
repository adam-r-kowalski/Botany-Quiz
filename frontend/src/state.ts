import { Theme, createMuiTheme } from "@material-ui/core/styles";

export interface Plant {
    commonName: string;
    species: string;
    familyName: string;
    image: string;
}

export const newPlant = (index: number): Plant => ({
    commonName: `common name ${index}`,
    species: `species ${index}`,
    familyName: `family name ${index}`,
    image: `image ${index}`,
});

export const defaultPlant = (): Plant => ({
    commonName: "change me",
    species: "change me",
    familyName: "change me",
    image: "https://cdn4.iconfinder.com/data/icons/under-construction-1/512/under-512.png"
})

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

export interface State {
    allPlants: Plant[];
    plants: Plant[];
    theme?: Theme;
    question?: Question;
    route: Route;
    needsSaving: boolean;
}

export const initialState = (): State => ({
    allPlants: [],
    plants: [],
    theme: createMuiTheme(),
    route: Route.Quiz,
    needsSaving: false
});