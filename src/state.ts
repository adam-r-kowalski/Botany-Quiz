import { Theme, createMuiTheme } from "@material-ui/core/styles";

export interface Plant {
    commonName: string;
    species: string;
    familyName: string;
    image: string;
}

export interface Question {
    index: number;
    commonName: string;
    species: string;
    familyName: string;
}

export interface State {
    plants: Plant[];
    theme: Theme;
    question?: Question;
}

export const initialState: State = {
    plants: [
        {
            commonName: "Vine Maple",
            species: "Acer circinatum",
            familyName: "Aceraceae",
            image: "http://www.nwplants.com/images/trees/ace_cir_jko_vine_maplecrop.jpg"
        },
        {
            commonName: "Flowering Dogwood",
            species: "Cornus florida",
            familyName: "Cornaceae",
            image: "http://media.al.com/living_impact/photo/dogwood-berries2jpg-bb9a293ff1d8b9b8.jpg"
        },
        {
            commonName: "Kousa Dogwood",
            species: "Cornus kousa",
            familyName: "Cornaceae",
            image: "https://i.ytimg.com/vi/4XbfqZfMliw/maxresdefault.jpg"
        },
        {
            commonName: "Cornelian-cherry",
            species: "Cornus mas",
            familyName: "Cornaceae",
            image: "http://cdn.shopify.com/s/files/1/1518/9342/products/cornus_mas3_1024x1024.JPG?v=1521242288"
        },
        {
            commonName: "Pacific Dogwood",
            species: "Cornus nuttallii",
            familyName: "Cornaceae",
            image: "http://www.paulnoll.com/Oregon/Wildflower/plant-Dogwood-Pacific-fruit-big.jpg"
        }
    ],
    theme: createMuiTheme()
};
