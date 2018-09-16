import * as React from "react";
import { Card, CardMedia, CardContent, TextField, Button } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import { Consumer, Dispatch } from "./context";
import { Plant } from "./state";
import { EditCommonName, EditSpecies, EditFamilyName } from "./event/settings";
import { StorePlants } from "./event/server";

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
            />
            <TextField
                label="Common Name"
                value={plant.commonName}
                onChange={e => dispatch(new EditCommonName(e.target.value, index))}
            />
            <TextField
                label="Species"
                value={plant.species}
                onChange={e => dispatch(new EditSpecies(e.target.value, index))}
            />
            <TextField
                label="Family Name"
                value={plant.familyName}
                onChange={e => dispatch(new EditFamilyName(e.target.value, index))}
            />
            <div style={styles.spacer} />
            <Button color="secondary" style={styles.delete}>Delete</Button>
        </CardContent>
    </Card>

export default () =>
    <Consumer>
        {({ state, dispatch }) =>
            <>
                {state.allPlants.map((p, i) => plant(p, i, dispatch))}
                <Button
                    variant="extendedFab"
                    color="primary"
                    style={styles.fab}
                    onClick={() => dispatch(new StorePlants(dispatch))}
                >
                    <SaveIcon />
                    Save
                </Button>
            </>
        }
    </Consumer>;