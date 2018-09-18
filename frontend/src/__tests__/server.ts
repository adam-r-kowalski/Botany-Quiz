import { State, Route, Plant, question, newPlant } from "../state";
import { LoadPlants, ReceivedPlants, StorePlants, Status, StoredPlants } from "../event/server";

const emptyState = (): State => ({
    allPlants: [],
    plants: [],
    route: Route.Quiz
});

const loadPlants = (count: number, plants: Plant[] = []) => {
    for (let i = 0; i < count; ++i) plants.push(newPlant(i));

    return async function plantStore(): Promise<Plant[]> {
        return plants;
    }
};

const storePlants = async (url: String): Promise<Status> => ({
    status: true
});

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

test("Store Plants", () => {
    const state = emptyState();
    new StorePlants(() => {
        const expected = emptyState();
        expect(state).toEqual(expected);
    }, storePlants).update(state);
});

test("Stored Plants", () => {
    const state = emptyState();
    const event = new StoredPlants();

    const expected = emptyState();
    expected.notification = { content: "Plants saved!" };

    expect(event.update(state)).toEqual(expected);
});