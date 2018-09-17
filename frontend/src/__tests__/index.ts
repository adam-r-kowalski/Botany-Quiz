import { Route, State } from "../state";
import { ViewSettings, ViewQuiz, CloseNotification } from "../event";

export const emptyState = (): State => ({
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

test('Close Notification', () => {
    const state = { ...emptyState(), notification: { content: "I am a notification" } };
    const event = new CloseNotification();
    const expected = emptyState();
    expect(event.update(state)).toEqual(expected);
});