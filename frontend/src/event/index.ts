import { State, Route } from "../state";

export interface Event {
    update: (state: State) => State;
}

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

export class CloseNotification implements Event {
    update = (state: State): State => {
        delete state.notification;
        return state;
    }
}