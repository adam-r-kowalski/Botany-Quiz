import { Event } from ".";
import { State, Route } from "../state";

export class ViewSettings implements Event {
    update = (state: State): State => ({ ...state, route: Route.Settings })
}

export class ViewQuiz implements Event {
    update = (state: State): State => {
        state.route = Route.Quiz;
        state.plants = state.allPlants.slice(0);
        return state;
    }
}
