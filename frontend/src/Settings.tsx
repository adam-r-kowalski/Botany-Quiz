import * as React from "react";
import * as mui from "@material-ui/core";
import * as icons from "@material-ui/icons";

import { Consumer, Dispatch } from "./context";
import { Plant } from "./state";
import { EditCommonName, EditSpecies, EditFamilyName, DeletePlant, EditImage, AddPlant } from "./event/settings";

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
    },
    padder: {
        margin: "0 10px"
    }
};

const plant = (plant: Plant, index: number, dispatch: Dispatch) =>
    <mui.Card style={styles.card} key={index}>
        <mui.CardMedia image={plant.image} style={styles.image} />
        <mui.CardContent style={styles.content}>
            <mui.TextField
                label="Image"
                value={plant.image}
                onChange={e => dispatch(new EditImage(dispatch, e.target.value, index))}
            />
            <mui.TextField
                label="Common Name"
                value={plant.commonName}
                onChange={e => dispatch(new EditCommonName(dispatch, e.target.value, index))}
            />
            <mui.TextField
                label="Species"
                value={plant.species}
                onChange={e => dispatch(new EditSpecies(dispatch, e.target.value, index))}
            />
            <mui.TextField
                label="Family Name"
                value={plant.familyName}
                onChange={e => dispatch(new EditFamilyName(dispatch, e.target.value, index))}
            />
            <div style={styles.spacer} />
            <mui.Button
                color="secondary"
                style={styles.delete}
                onClick={() => dispatch(new DeletePlant(dispatch, index))}
            >
                Delete
            </mui.Button>
        </mui.CardContent>
    </mui.Card>

export default () =>
    <Consumer>
        {({ state, dispatch }) =>
            <>
                {state.allPlants.map((p, i) => plant(p, i, dispatch))}
                <mui.Button
                    variant="extendedFab"
                    color="primary"
                    style={styles.fab}
                    onClick={() => dispatch(new AddPlant(dispatch))}
                >
                    Add Plant
                    <div style={styles.padder} />
                    <icons.Add />
                </mui.Button>
            </>
        }
    </Consumer>;