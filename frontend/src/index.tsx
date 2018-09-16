import * as React from "react";
import * as ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { State, initialState, Route } from "./state";
import { Provider } from "./context";
import AppBar from "./AppBar";
import Quiz from "./Quiz";
import { Event } from "./event";
import { LoadPlants } from "./event/server";
import Settings from "./Settings";
import Notification from "./Notification";

document.body.style.margin = "0";

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () =>
        this.dispatch(new LoadPlants(this.dispatch))

    dispatch = (event: Event) =>
        this.setState(event.update(this.state))

    render = () =>
        <Provider value={{ dispatch: this.dispatch, state: this.state }}>
            <MuiThemeProvider theme={this.state.theme}>
                <AppBar />
                {this.state.route == Route.Quiz ? <Quiz /> : <Settings />}
                <Notification />
            </MuiThemeProvider>
        </Provider>
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);