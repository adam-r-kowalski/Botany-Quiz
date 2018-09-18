import * as React from "react";
import { Card, CardMedia, CardContent, TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import { Consumer, Dispatch } from "./context";
import { Plant } from "./state";
import { EditCommonName, EditSpecies, EditFamilyName, DeletePlant, EditImage } from "./event/settings";
import { SavePlants } from "./event/server";

const styles: { [name: string]: React.CSSProperties } = {
    card: {
        width: 700,
        margin: "20px auto",
        display: "flex"
    },
    image: {
        width: 300,
        height: 300
    },
    content: {
        width: 400,
        display: "flex",
        flexDirection: "column"
    },
    spacer: {
        flex: 1
    },
    delete: {
        alignSelf: "flex-end",
        justifySelf: "flex-end"
    },
    fab: {
        position: "fixed",
        right: 20,
        bottom: 20
    }
};

const plant = (plant: Plant, index: number, dispatch: Dispatch) =>
    <Card style={styles.card} key={index}>
        <CardMedia image={plant.image} style={styles.image} />
        <CardContent style={styles.content}>
            <TextField
                label="Image"
                value={plant.image}
                onChange={e => dispatch(new EditImage(dispatch, e.target.value, index))}
            />
            <TextField
                label="Common Name"
                value={plant.commonName}
                onChange={e => dispatch(new EditCommonName(dispatch, e.target.value, index))}
            />
            <TextField
                label="Species"
                value={plant.species}
                onChange={e => dispatch(new EditSpecies(dispatch, e.target.value, index))}
            />
            <TextField
                label="Family Name"
                value={plant.familyName}
                onChange={e => dispatch(new EditFamilyName(dispatch, e.target.value, index))}
            />
            <div style={styles.spacer} />
            <Button
                color="secondary"
                style={styles.delete}
                onClick={() => dispatch(new DeletePlant(index))}
            >
                Delete
            </Button>
        </CardContent>
    </Card>

export default () =>
    <Consumer>
        {({ state, dispatch }) =>
            state.allPlants.map((p, i) => plant(p, i, dispatch))}
    </Consumer>;