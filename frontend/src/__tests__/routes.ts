import { Route, State } from "../state";
import { ViewSettings, ViewQuiz } from "../event/routes";

const emptyState = (): State => ({
    allPlants: [],
    plants: [],
    route: Route.Quiz
});

test('View Settings', () => {
    const state = emptyState();
    const event = new ViewSettings();
    const expected = { ...emptyState(), route: Route.Settings };
    expect(event.update(state)).toEqual(expected);
});

test('View Quiz', () => {
    const state = emptyState();
    const event = new ViewQuiz();
    const expected = { ...emptyState(), route: Route.Quiz };
    expect(event.update(state)).toEqual(expected);
});
