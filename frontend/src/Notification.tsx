import * as React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { Consumer } from "./context";
import { CloseNotification } from "./event/notification";

export default () =>
    <Consumer>
        {({ state, dispatch }) =>
            state.notification ?
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    open={true}
                    autoHideDuration={6000}
                    onClose={() => dispatch(new CloseNotification())}
                    message={state.notification.content}
                    action={[
                        <IconButton onClick={() => dispatch(new CloseNotification())}>
                            <CloseIcon />
                        </IconButton>
                    ]}
                /> : <></>
        }
    </Consumer>