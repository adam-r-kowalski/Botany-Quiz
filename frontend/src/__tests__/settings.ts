import { State, Route, Plant, newPlant } from "../state";
import { EditImage, EditCommonName, EditSpecies, EditFamilyName, DeletePlant } from "../event/settings";

const emptyState = (allPlants: Plant[] = []): State => ({
    allPlants: allPlants,
    plants: allPlants.slice(0),
    route: Route.Quiz
});

test("Edit Image", () => {
    const state = emptyState();
    const event = new EditImage("image", 0);
    const expected = emptyState();
    expect(event.update(state)).toEqual(expected);
});

test("Edit Image 1", () => {
    const state = emptyState([newPlant(0)]);

    const newName = "different name";
    const event = new EditImage(newName, 0);

    const expected = emptyState([newPlant(0)]);
    expected.plants[0].image = newName;

    expect(event.update(state)).toEqual(expected);
});

test("Edit Common Name", () => {
    const state = emptyState();
    const event = new EditCommonName("common name", 0);
    const expected = emptyState();
    expect(event.update(state)).toEqual(expected);
});

test("Edit Common Name 1", () => {
    const state = emptyState([newPlant(0)]);

    const newName = "different name";
    const event = new EditCommonName(newName, 0);

    const expected = emptyState([newPlant(0)]);
    expected.plants[0].commonName = newName;

    expect(event.update(state)).toEqual(expected);
});

test("Edit Species", () => {
    const state = emptyState();
    const event = new EditSpecies("species", 0);
    const expected = emptyState();
    expect(event.update(state)).toEqual(expected);
});

test("Edit Species 1", () => {
    const state = emptyState([newPlant(0)]);

    const newName = "different species";
    const event = new EditSpecies(newName, 0);

    const expected = emptyState([newPlant(0)]);
    expected.plants[0].species = newName;

    expect(event.update(state)).toEqual(expected);
});

test("Edit Family Name", () => {
    const state = emptyState();
    const event = new EditFamilyName("family name", 0);
    const expected = emptyState();
    expect(event.update(state)).toEqual(expected);
});

test("Edit Common Name 1", () => {
    const state = emptyState([newPlant(0)]);

    const newName = "different name";
    const event = new EditFamilyName(newName, 0);

    const expected = emptyState([newPlant(0)]);
    expected.plants[0].familyName = newName;

    expect(event.update(state)).toEqual(expected);
});

test("Delete Plant", () => {
    const state = emptyState();
    const event = new DeletePlant(0);
    const expected = emptyState();
    expect(event.update(state)).toEqual(expected);
});

test("Delete Plant 1", () => {
    const state = emptyState([newPlant(0)]);
    const event = new DeletePlant(0);
    const expected = emptyState();
    expect(event.update(state)).toEqual(expected);
});

test("Delete Plant 2", () => {
    const state = emptyState([newPlant(0), newPlant(1)]);
    const event = new DeletePlant(0);
    const expected = emptyState([newPlant(1)]);
    expect(event.update(state)).toEqual(expected);
});