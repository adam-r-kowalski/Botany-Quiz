import { Route, State } from "../state";
import { ViewSettings, ViewQuiz } from "../event/routes";
import { Dispatch } from "../context";

const mockDispatch: () => jest.Mock<Dispatch> = () => jest.fn(_ => { });

const emptyState = (): State => ({
    allPlants: [],
    plants: [],
    route: Route.Quiz,
    needsSaving: false
});

test('View Settings', () => {
    const state = emptyState();
    const event = new ViewSettings();
    const expected = { ...emptyState(), route: Route.Settings };
    expect(event.update(state)).toEqual(expected);
});

test('View Quiz', () => {
    const state = emptyState();

    const dispatch = mockDispatch();
    const event = new ViewQuiz(dispatch);

    const expected = { ...emptyState(), route: Route.Quiz };
    expect(event.update(state)).toEqual(expected);
    expect(dispatch.mock.calls.length).toEqual(1);
});
