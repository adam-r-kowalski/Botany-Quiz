import { CloseNotification } from "../event/notification";
import { State, Route } from "../state";

const emptyState = (): State => ({
    allPlants: [],
    plants: [],
    route: Route.Quiz
});

test('Close Notification', () => {
    const state = { ...emptyState(), notification: { content: "I am a notification" } };
    const event = new CloseNotification();
    const expected = emptyState();
    expect(event.update(state)).toEqual(expected);
});