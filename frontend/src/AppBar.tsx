import * as React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import { Consumer } from "./context";
import { StorePlantsOnServer } from "./event";

export default () =>
    <Consumer>
        {({ state, dispatch }) =>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Botany Quiz {state.allPlants.length - state.plants.length} / {state.allPlants.length}
                    </Typography>
                    <div style={{ flex: 1 }} />
                    <Button onClick={e => dispatch(new StorePlantsOnServer())}>
                        Settings
                        <SettingsIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        }
    </Consumer>;