import { State, Route, Plant, question, newPlant } from "../state";
import { LoadPlants, ReceivedPlants, SavedPlants, NeedsSaving, SavePlants } from "../event/server";
import { Dispatch } from "../context";

const emptyState = (): State => ({
    allPlants: [],
    plants: [],
    route: Route.Quiz,
    needsSaving: false
});

const loadPlants = (count: number, plants: Plant[] = []) => {
    for (let i = 0; i < count; ++i) plants.push(newPlant(i));

    return async function plantStore(): Promise<Plant[]> {
        return plants;
    }
};

const mockDispatch: () => jest.Mock<Dispatch> = () => jest.fn(_ => { });

const mockRequest = <T>(value: T): jest.Mock<Promise<T>> =>
    jest.fn(async _ => value);


test("Load Plants 0", () => {
    const state = emptyState();

    new LoadPlants(event => {
        expect((event as ReceivedPlants).length).toEqual(0);
    }, loadPlants(0)).update(state);
});

test("Load Plants 1", () => {
    const state = emptyState();

    new LoadPlants(e => {
        expect((e as ReceivedPlants).length).toEqual(1);
    }, loadPlants(1)).update(state);
});

test("Load Plants 1 value", () => {
    const state = emptyState();

    new LoadPlants(e => {
        expect((e as ReceivedPlants).next().value).toEqual(newPlant(0));
    }, loadPlants(1)).update(state);
});

test("Received Plants", () => {
    const state = emptyState();
    new ReceivedPlants(event => {
        const expected = emptyState();
        const plant = newPlant(0);
        expected.plants.push(plant);
        expected.allPlants.push(plant);
        expected.question = question(0);

        expect(event.update(state)).toEqual(expected);
    }, [newPlant(0)]).update(state);
});

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

test("Needs Saving", async () => {
    const state = emptyState();
    const dispatch = mockDispatch();
    const event = new NeedsSaving(dispatch);

    const expected = emptyState();
    expected.needsSaving = true;

    expect(event.update(state)).toEqual(expected);

    await sleep(500);
    expect(dispatch.mock.calls.length).toEqual(1);
});

test("Save Plants", async () => {
    const state = emptyState();
    state.needsSaving = true;

    const dispatch = mockDispatch();
    const request = mockRequest({ status: true });
    const event = new SavePlants(dispatch, request);

    const expected = emptyState();

    expect(event.update(state)).toEqual(expected);
    await sleep(1);
    expect(dispatch.mock.calls.length).toEqual(1);
    expect(request.mock.calls.length).toEqual(1);
});

test("Saved Plants", () => {
    const state = emptyState();
    const event = new SavedPlants();

    const expected = emptyState();
    expected.needsSaving = false;

    expect(event.update(state)).toEqual(expected);
});
