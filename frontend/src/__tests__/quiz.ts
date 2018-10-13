import { State, Route, question, newPlant } from "../state";
import {
  EditCommonName,
  EditSpecies,
  EditFamilyName,
  SubmitAnswers,
  ViewCorrectAnswers,
  SelectRandomQuestion
} from "../event/quiz";

const emptyState = (): State => {
  const allPlants = [newPlant(0), newPlant(1), newPlant(2)];

  return {
    allPlants,
    plants: allPlants.slice(0),
    route: Route.Quiz,
    question: question(0),
    needsSaving: false,
    serverReady: true
  };
};

test("Edit Common Name", () => {
  const state = emptyState();
  const event = new EditCommonName("name");
  const expected = emptyState();
  expected.question.commonName = "name";
  expect(event.update(state)).toEqual(expected);
});

test("Edit Species", () => {
  const state = emptyState();
  const event = new EditSpecies("name");
  const expected = emptyState();
  expected.question.species = "name";
  expect(event.update(state)).toEqual(expected);
});

test("Edit Family Name", () => {
  const state = emptyState();
  const event = new EditFamilyName("name");
  const expected = emptyState();
  expected.question.familyName = "name";
  expect(event.update(state)).toEqual(expected);
});

test("Submit Answers all wrong", () => {
  const state = emptyState();
  const event = new SubmitAnswers();
  const expected = emptyState();
  expected.question.showErrors = true;
  expected.question.allAnswersCorrect = false;
  expect(event.update(state)).toEqual(expected);
});

test("Submit Answers one right", () => {
  const state = emptyState();
  state.question.commonName = "common name 0";

  const event = new SubmitAnswers();

  const expected = emptyState();
  expected.question.commonName = "common name 0";
  expected.question.showErrors = true;
  expected.question.allAnswersCorrect = false;

  expect(event.update(state)).toEqual(expected);
});

test("Submit Answers two right", () => {
  const state = emptyState();
  state.question.commonName = "common name 0";
  state.question.species = "species 0";

  const event = new SubmitAnswers();

  const expected = emptyState();
  expected.question.commonName = "common name 0";
  expected.question.species = "species 0";
  expected.question.showErrors = true;
  expected.question.allAnswersCorrect = false;

  expect(event.update(state)).toEqual(expected);
});

test("Submit Answers all right", () => {
  const state = emptyState();
  state.question.commonName = "common name 0";
  state.question.species = "species 0";
  state.question.familyName = "family name 0";

  const event = new SubmitAnswers();

  const expected = emptyState();
  expected.question.commonName = "common name 0";
  expected.question.species = "species 0";
  expected.question.familyName = "family name 0";
  expected.question.showErrors = false;
  expected.question.allAnswersCorrect = true;

  expect(event.update(state)).toEqual(expected);
});

test("View Correct Answers", () => {
  const state = emptyState();
  const event = new ViewCorrectAnswers();

  const expected = emptyState();
  expected.question.commonName = "common name 0";
  expected.question.species = "species 0";
  expected.question.familyName = "family name 0";

  expect(event.update(state)).toEqual(expected);
});

test("Select Random Question choose 0", () => {
  const state = emptyState();
  const event = new SelectRandomQuestion(() => 0);

  const expected = emptyState();
  expected.plants.splice(0, 1);
  expected.question = question(0);

  expect(event.update(state)).toEqual(expected);
});

test("Select Random Question choose 1", () => {
  const state = emptyState();
  const event = new SelectRandomQuestion(() => 1);

  const expected = emptyState();
  expected.plants.splice(0, 1);
  expected.question = question(1);

  expect(event.update(state)).toEqual(expected);
});

test("Select Random Question choose 0 choose 0", () => {
  const firstState = emptyState();
  const firstEvent = new SelectRandomQuestion(() => 0);

  const secondState = firstEvent.update(firstState);
  const secondEvent = new SelectRandomQuestion(() => 0);

  const expected = emptyState();
  expected.plants.splice(0, 1);
  expected.plants.splice(0, 1);
  expected.question = question(0);

  expect(secondEvent.update(secondState)).toEqual(expected);
});

test("Select Random Question choose 0 choose 1", () => {
  const firstState = emptyState();
  const firstEvent = new SelectRandomQuestion(() => 0);

  const secondState = firstEvent.update(firstState);
  const secondEvent = new SelectRandomQuestion(() => 1);

  const expected = emptyState();
  expected.plants.splice(0, 1);
  expected.plants.splice(0, 1);
  expected.question = question(1);

  expect(secondEvent.update(secondState)).toEqual(expected);
});

test("Select Random Question choose 1 choose 0", () => {
  const firstState = emptyState();
  const firstEvent = new SelectRandomQuestion(() => 1);

  const secondState = firstEvent.update(firstState);
  const secondEvent = new SelectRandomQuestion(() => 0);

  const expected = emptyState();
  expected.plants.splice(0, 1);
  expected.plants.splice(1, 1);
  expected.question = question(0);

  expect(secondEvent.update(secondState)).toEqual(expected);
});

test("Select Random Question choose 0 choose 0 choose 0", () => {
  const firstState = emptyState();
  const firstEvent = new SelectRandomQuestion(() => 0);

  const secondState = firstEvent.update(firstState);
  const secondEvent = new SelectRandomQuestion(() => 0);

  const thirdState = secondEvent.update(secondState);
  const thirdEvent = new SelectRandomQuestion(() => 0);

  const expected = emptyState();
  expected.question = question(0);

  expect(thirdEvent.update(thirdState)).toEqual(expected);
});

test("Select Random Question choose 0 choose 0 choose 1", () => {
  const firstState = emptyState();
  const firstEvent = new SelectRandomQuestion(() => 0);

  const secondState = firstEvent.update(firstState);
  const secondEvent = new SelectRandomQuestion(() => 0);

  const thirdState = secondEvent.update(secondState);
  const thirdEvent = new SelectRandomQuestion(() => 1);

  const expected = emptyState();
  expected.question = question(1);

  expect(thirdEvent.update(thirdState)).toEqual(expected);
});

test("Select Random Question choose 1 choose 0 choose 1", () => {
  const firstState = emptyState();
  const firstEvent = new SelectRandomQuestion(() => 1);

  const secondState = firstEvent.update(firstState);
  const secondEvent = new SelectRandomQuestion(() => 0);

  const thirdState = secondEvent.update(secondState);
  const thirdEvent = new SelectRandomQuestion(() => 1);

  const expected = emptyState();
  expected.question = question(1);

  expect(thirdEvent.update(thirdState)).toEqual(expected);
});

test("Select Random Question choose 0 choose 0 choose 0 choose 1", () => {
  const firstState = emptyState();
  const firstEvent = new SelectRandomQuestion(() => 0);

  const secondState = firstEvent.update(firstState);
  const secondEvent = new SelectRandomQuestion(() => 0);

  const thirdState = secondEvent.update(secondState);
  const thirdEvent = new SelectRandomQuestion(() => 0);

  const fourthState = thirdEvent.update(thirdState);
  const fourthEvent = new SelectRandomQuestion(() => 1);

  const expected = emptyState();
  expected.plants.splice(0, 1);
  expected.question = question(1);

  expect(fourthEvent.update(fourthState)).toEqual(expected);
});
