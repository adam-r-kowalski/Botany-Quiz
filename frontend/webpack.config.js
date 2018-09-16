const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    devtool: "source-map",

    devServer: {
        compress: true,
        port: 3000,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js?$/, loader: "source-map-loader" },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: require("html-webpack-template"),
            appMountId: "app",
            mobile: true,
            links: ["https://fonts.googleapis.com/css?family=Roboto:300,400,500"],
            title: "Botany Quiz"
        })
    ]
}