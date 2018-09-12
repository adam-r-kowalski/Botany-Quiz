import * as React from "react";
import { Card, CardMedia, CardContent, CardActions, Button, TextField } from "@material-ui/core";

import { Consumer } from "./context";

const styles: {[name: string]: React.CSSProperties} = {
    card: {
        width: 400,
        margin: "20px auto"
    },
    cardMedia: {
        width: 300,
        height: 300,
        margin: "0 auto"
    },
    textField: {
        width: "100%",
        margin: 5
    }
};

export default () =>
    <Consumer>
        {({state}) =>
            state.question ?
                <Card style={styles.card}>
                    <CardContent>
                        <CardMedia
                            image={state.plants[state.question.index].image}
                            style={styles.cardMedia}
                        />
                        <TextField
                            label="Common Name"
                            style={styles.textField}
                        />
                        <TextField
                            label="Species"
                            style={styles.textField}
                        />
                        <TextField
                            label="Family Name"
                            style={styles.textField}
                        />
                    </CardContent>
                    <CardActions>
                        <Button color="primary">
                            Submit Answers
                        </Button>

                        <Button color="secondary">
                            View Correct Answers
                        </Button>
                    </CardActions>
                </Card> :
            <div>No Question</div>
        }
    </Consumer>
    