import * as React from "react";
import * as mui from "@material-ui/core";
import * as icons from "@material-ui/icons";

import { Consumer, Dispatch } from "./context";
import { ViewSettings, ViewQuiz } from "./event/routes";
import { State, Route } from "./state";

const buffer = 10;

const styles: { [name: string]: React.CSSProperties } = {
  padder: {
    margin: `0 ${buffer}px`
  },
  smallPadder: {
    margin: `0 ${buffer / 2}px`
  },
  spacer: {
    flex: 1
  },
  flex: {
    display: "flex"
  }
};

const quiz = (state: State, dispatch: Dispatch) => (
  <mui.Toolbar>
    <mui.Typography variant="title" color="inherit" style={styles.flex}>
      Botany Quiz
      <div style={styles.padder} />
      {state.allPlants.length - state.plants.length} / {state.allPlants.length}
    </mui.Typography>
    <div style={styles.spacer} />
    <mui.Button onClick={() => dispatch(new ViewSettings())}>
      Settings
      <div style={styles.smallPadder} />
      <icons.Settings />
    </mui.Button>
  </mui.Toolbar>
);

const settings = (state: State, dispatch: Dispatch) => (
  <mui.Toolbar>
    <mui.Typography variant="title" color="inherit">
      Botany Settings
    </mui.Typography>
    <div style={styles.padder} />

    <icons.Save
      color={state.needsSaving || !state.serverReady ? "error" : "primary"}
    />

    <div style={styles.spacer} />
    <mui.Button onClick={() => dispatch(new ViewQuiz(dispatch))}>
      Quiz
      <div style={styles.smallPadder} />
      <icons.Grade />
    </mui.Button>
  </mui.Toolbar>
);

export default () => (
  <Consumer>
    {({ state, dispatch }) => (
      <mui.AppBar position="static" color="default">
        {state.route == Route.Quiz
          ? quiz(state, dispatch)
          : settings(state, dispatch)}
      </mui.AppBar>
    )}
  </Consumer>
);
