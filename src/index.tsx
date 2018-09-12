import * as React from "react";
import * as ReactDOM from "react-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { State, initialState } from "./state";
import { Provider } from "./context";
import AppBar from "./AppBar";
import Question from "./Question";
import { Event, SelectRandomQuestion } from "./event";

document.body.style.margin = "0";

class App extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = initialState();
    }

    componentDidMount = () =>
        this.dispatch(new SelectRandomQuestion())

    dispatch = (event: Event) =>
        this.setState(event.update(this.state))

    render = () =>
        <Provider value={{dispatch: this.dispatch, state: this.state}}>
            <MuiThemeProvider theme={this.state.theme}>
                <AppBar />
                <Question />
            </MuiThemeProvider>
        </Provider>
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);