import { State, Route, Plant, newPlant, defaultPlant } from "../state";
import {
  EditImage,
  EditCommonName,
  EditSpecies,
  EditFamilyName,
  DeletePlant,
  AddPlant
} from "../event/settings";
import { Dispatch } from "../context";

const emptyState = (allPlants: Plant[] = []): State => ({
  allPlants: allPlants,
  plants: allPlants.slice(0),
  route: Route.Quiz,
  needsSaving: false,
  serverReady: true
});

const mockDispatch: () => jest.Mock<Dispatch> = () => jest.fn(_ => {});

test("Edit Image", () => {
  const state = emptyState();
  const dispatch = mockDispatch();
  const event = new EditImage(dispatch, "image", 0);
  const expected = emptyState();
  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(0);
});

test("Edit Image 1", () => {
  const state = emptyState([newPlant(0)]);
  const dispatch = mockDispatch();

  const newName = "different name";
  const event = new EditImage(dispatch, newName, 0);

  const expected = emptyState([newPlant(0)]);
  expected.plants[0].image = newName;

  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});

test("Edit Common Name", () => {
  const state = emptyState();
  const dispatch = mockDispatch();
  const event = new EditCommonName(dispatch, "common name", 0);
  const expected = emptyState();
  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(0);
});

test("Edit Common Name 1", () => {
  const state = emptyState([newPlant(0)]);
  const dispatch = mockDispatch();

  const newName = "different name";
  const event = new EditCommonName(dispatch, newName, 0);

  const expected = emptyState([newPlant(0)]);
  expected.plants[0].commonName = newName;

  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});

test("Edit Species", () => {
  const state = emptyState();
  const dispatch = mockDispatch();

  const event = new EditSpecies(dispatch, "species", 0);
  const expected = emptyState();
  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(0);
});

test("Edit Species 1", () => {
  const state = emptyState([newPlant(0)]);
  const dispatch = mockDispatch();

  const newName = "different species";
  const event = new EditSpecies(dispatch, newName, 0);

  const expected = emptyState([newPlant(0)]);
  expected.plants[0].species = newName;

  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});

test("Edit Family Name", () => {
  const state = emptyState();
  const dispatch = mockDispatch();

  const event = new EditFamilyName(dispatch, "family name", 0);
  const expected = emptyState();

  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(0);
});

test("Edit Common Name 1", () => {
  const state = emptyState([newPlant(0)]);
  const dispatch = mockDispatch();

  const newName = "different name";
  const event = new EditFamilyName(dispatch, newName, 0);

  const expected = emptyState([newPlant(0)]);
  expected.plants[0].familyName = newName;

  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});

test("Delete Plant", () => {
  const state = emptyState();
  const dispatch = mockDispatch();

  const event = new DeletePlant(dispatch, 0);

  const expected = emptyState();

  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});

test("Delete Plant 1", () => {
  const state = emptyState([newPlant(0)]);
  const dispatch = mockDispatch();

  const event = new DeletePlant(dispatch, 0);

  const expected = emptyState();

  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});

test("Delete Plant 2", () => {
  const state = emptyState([newPlant(0), newPlant(1)]);
  const dispatch = mockDispatch();

  const event = new DeletePlant(dispatch, 0);

  const expected = emptyState([newPlant(1)]);
  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});

test("Add Plant", () => {
  const state = emptyState();
  const dispatch = mockDispatch();
  const event = new AddPlant(dispatch);
  const expected = emptyState([defaultPlant()]);
  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});

test("Add Plant 1", () => {
  const state = emptyState([newPlant(0)]);
  const dispatch = mockDispatch();
  const event = new AddPlant(dispatch);
  const expected = emptyState([defaultPlant(), newPlant(0)]);
  expect(event.update(state)).toEqual(expected);
  expect(dispatch.mock.calls.length).toEqual(1);
});
