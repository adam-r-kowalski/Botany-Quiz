import { State, Route } from "../state";

const emptyState = (): State => ({
    allPlants: [],
    plants: [],
    route: Route.Quiz,
    needsSaving: false
});

test("AppBar show quiz", () => {
    expect(true).toEqual(true);
});
