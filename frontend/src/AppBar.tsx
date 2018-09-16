import * as React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import GradeIcon from "@material-ui/icons/Grade";

import { Consumer, Dispatch } from "./context";
import { ViewSettings, ViewQuiz } from "./event";
import { State, Route } from "./state";

const quiz = (state: State, dispatch: Dispatch) =>
    <Toolbar>
        <Typography variant="title" color="inherit">
            Botany Quiz {state.allPlants.length - state.plants.length} / {state.allPlants.length}
        </Typography>
        <div style={{ flex: 1 }} />
        <Button onClick={e => dispatch(new ViewSettings())}>
            Settings
            <SettingsIcon />
        </Button>
    </Toolbar>;

const settings = (dispatch: Dispatch) =>
    <Toolbar>
        <Typography variant="title" color="inherit">
            Botany Settings
        </Typography>
        <div style={{ flex: 1 }} />
        <Button onClick={e => dispatch(new ViewQuiz())}>
            Quiz
            <GradeIcon />
        </Button>
    </Toolbar>;

export default () =>
    <Consumer>
        {({ state, dispatch }) =>
            <AppBar position="static" color="default">
                {state.route == Route.Quiz ? quiz(state, dispatch) : settings(dispatch)}
            </AppBar>
        }
    </Consumer>;