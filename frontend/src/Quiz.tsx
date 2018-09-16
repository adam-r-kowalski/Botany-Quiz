import * as React from "react";
import { Card, CardMedia, CardContent, CardActions, Button, TextField, Typography } from "@material-ui/core";

import { Consumer, Dispatch } from "./context";
import { EditCommonName, EditSpecies, EditFamilyName, SubmitAnswers, ViewCorrectAnswers, SelectRandomQuestion } from "./event/quiz";
import { wrongCommonName, wrongSpecies, wrongFamilyName } from "./checkWrong";

const styles: { [name: string]: React.CSSProperties } = {
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
    },
    rows: {
        display: "flex",
        flexDirection: "column",
    },
    center: {
        textAlign: "center",
        marginBottom: 10
    }
};

const allAnswersCorrect = (dispatch: Dispatch) =>
    <CardActions style={styles.rows}>
        <Typography variant="title" style={styles.center}>
            Nice job babe! You got them all right! I love you :)
        </Typography>
        <Button color="primary" onClick={() => dispatch(new SelectRandomQuestion())}>
            Next Question
        </Button>
    </CardActions>

const stillWorking = (dispatch: Dispatch) =>
    <CardActions>
        <Button color="primary" onClick={() => dispatch(new SubmitAnswers())}>
            Submit Answers
        </Button>

        <Button color="secondary" onClick={() => dispatch(new ViewCorrectAnswers())}>
            View Correct Answers
        </Button>
    </CardActions>;

export default () =>
    <Consumer>
        {({ state, dispatch }) =>
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
                            error={state.question.showErrors && wrongCommonName(state)}
                        />
                        <TextField
                            label="Species"
                            style={styles.textField}
                            value={state.question.species}
                            onChange={e => dispatch(new EditSpecies(e.target.value))}
                            error={state.question.showErrors && wrongSpecies(state)}
                        />
                        <TextField
                            label="Family Name"
                            style={styles.textField}
                            value={state.question.familyName}
                            onChange={e => dispatch(new EditFamilyName(e.target.value))}
                            error={state.question.showErrors && wrongFamilyName(state)}
                        />
                    </CardContent>
                    {state.question.allAnswersCorrect ?
                        allAnswersCorrect(dispatch) :
                        stillWorking(dispatch)
                    }
                </Card> :
                <div />
        }
    </Consumer>
