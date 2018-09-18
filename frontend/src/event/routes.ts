import { Event } from ".";
import { State, Route } from "../state";
import { Dispatch } from "../context";
import { SavePlants } from "./server";

export class ViewSettings implements Event {
    update = (state: State): State => ({ ...state, route: Route.Settings })
}

export class ViewQuiz implements Event {
    constructor(private dispatch: Dispatch) { }

    update = (state: State): State => {
        state.route = Route.Quiz;
        state.plants = state.allPlants.slice(0);
        this.dispatch(new SavePlants(this.dispatch));
        return state;
    }
}
