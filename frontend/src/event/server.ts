import { Event } from ".";
import { Dispatch } from "../context";
import { State, Plant, newPlant } from "../state";
import { SelectRandomQuestion } from "./quiz";

type GetRequest<T> = (url: string) => Promise<T>;
type PostRequest = (url: string, json: string) => Promise<void>;

async function fetchGetRequest<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

async function fetchPostRequest(url: string, data: string): Promise<void> {
  await fetch(url, {
    method: "POST",
    body: data
  });
}

export interface Status {
  status: boolean;
}

const backend =
  "https://web.cecs.pdx.edu/~kowalski/Botany-Quiz/new_backend.cgi";

export class LoadPlants implements Event {
  constructor(
    private dispatch: Dispatch,
    private getRequest: GetRequest<Plant[]> = fetchGetRequest
  ) {}

  async process() {
    const plants = await this.getRequest(`${backend}?load`);
    this.dispatch(new ReceivedPlants(this.dispatch, plants));
  }

  update = (state: State): State => {
    this.process();
    return state;
  };
}

export class ReceivedPlants implements Event, Iterator<Plant> {
  public length: number;
  private index = 0;

  constructor(private dispatch: Dispatch, private plants: Plant[] = []) {
    this.length = plants.length;
  }

  update = (state: State): State => {
    state.plants = this.plants;
    state.allPlants = this.plants.slice(0);
    this.dispatch(new SelectRandomQuestion());
    return state;
  };

  public next(): IteratorResult<Plant> {
    return this.index < this.length
      ? {
          done: false,
          value: this.plants[this.index]
        }
      : { done: true, value: newPlant(0) };
  }
}

export class NeedsSaving implements Event {
  constructor(private dispatch: Dispatch) {}

  update = (state: State): State => {
    if (state.needsSaving) return state;
    state.needsSaving = true;
    setTimeout(() => this.dispatch(new SavePlants(this.dispatch)), 500);
    return state;
  };
}

export class SavePlants implements Event {
  constructor(
    private dispatch: Dispatch,
    private postRequest: PostRequest = fetchPostRequest
  ) {}

  async process(plants: Plant[]) {
    await this.postRequest(
      `${backend}?store`,
      JSON.stringify({ allPlants: plants })
    );
    this.dispatch(new SavedPlants());
  }

  update = (state: State): State => {
    this.process(state.allPlants);
    return { ...state, needsSaving: false };
  };
}

export class SavedPlants implements Event {
  update = (state: State): State => state;
}
