import { Event } from ".";
import { State } from "../state";

export class CloseNotification implements Event {
    update = (state: State): State => {
        delete state.notification;
        return state;
    }
}