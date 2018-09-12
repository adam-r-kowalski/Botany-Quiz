import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export default () =>
    <AppBar position="static" color="default">
        <Toolbar>
            <Typography variant="title" color="inherit">
                Botany Quiz
            </Typography>
        </Toolbar>
    </AppBar>;