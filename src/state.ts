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
    showErrors: boolean;
    allAnswersCorrect: boolean;
}

export interface State {
    plants: Plant[];
    theme: Theme;
    question?: Question;
}

export const initialState = (): State => ({
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
        },
        {
            commonName: "Oak",
            species: "Quercus",
            familyName: "Fagaceae",
            image: "https://c8.alamy.com/comp/X5H0FP/scarlet-oak-quercus-coccinea-autumn-colour-trees-leaves-autumn-fall-colour-red-yellow-oaks-oak-tree-trees-oak-oaks-quercus-X5H0FP.jpg"
        },
        {
            commonName: "Ash",
            species: "Fraxinus",
            familyName: "Oleaceae",
            image: "https://c8.alamy.com/comp/B6R563/common-ash-european-ash-fraxinus-excelsior-leaf-studio-picture-B6R563.jpg"
        },
        {
            commonName: "Cherry",
            species: "Prunus",
            familyName: "Rosaceae",
            image: "https://i.ebayimg.com/images/g/I6EAAMXQQtNR0VDb/s-l640.jpg"
        },
        {
            commonName: "American Basswood",
            species: "Tilia americana",
            familyName: "Tiliaceae",
            image: "http://www.mortonarb.org/files/Tilia-americana-leaf-sm-JH.jpg"
        }
    ],
    theme: createMuiTheme()
});
