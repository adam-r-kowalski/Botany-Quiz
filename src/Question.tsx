import * as React from "react";
import { Card, CardMedia, CardContent, CardActions, Button, TextField } from "@material-ui/core";

import { Consumer } from "./context";
import { EditCommonName, EditSpecies, EditFamilyName, SubmitAnswers, ViewCorrectAnswers } from "./event";
import { wrongCommonName, wrongSpecies, wrongFamilyName } from "./checkWrong";

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
        {({state, dispatch}) =>
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
                            value={state.question.commonName}
                            onChange={e => dispatch(new EditCommonName(e.target.value))}
                            error={wrongCommonName(state)}
                        />
                        <TextField
                            label="Species"
                            style={styles.textField}
                            value={state.question.species}
                            onChange={e => dispatch(new EditSpecies(e.target.value))}
                            error={wrongSpecies(state)}
                        />
                        <TextField
                            label="Family Name"
                            style={styles.textField}
                            value={state.question.familyName}
                            onChange={e => dispatch(new EditFamilyName(e.target.value))}
                            error={wrongFamilyName(state)}
                        />
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={() => dispatch(new SubmitAnswers())}>
                            Submit Answers
                        </Button>

                        <Button color="secondary" onClick={() => dispatch(new ViewCorrectAnswers())}>
                            View Correct Answers
                        </Button>
                    </CardActions>
                </Card> :
            <div />
        }
    </Consumer>
    