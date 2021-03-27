const path = require("path");

//plugin para inyectar js,css y nos fcilita enlazar los bundles a nuestro template HTML
const HtmlWebpackPlugin = require("html-webpack-plugin");
//plugin para unificar el css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//plugin para copia de archivos
const CopyWebpackPlugin = require("copy-webpack-plugin");
//plugin mini css comprime el css a escala mas pequeña y el js con el terser
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

const Dotenv = require("dotenv-webpack");
module.exports = {
	//elemento inicial de la App
	entry: "./src/index.js",
	//hacia donde vamos enviar lo que prepara webpack por defecto es dist
	output: {
		//path donde va a parar la carpeta contenedora
		path: path.resolve(__dirname, "dist"),
		//nombre al resultante del js unificado
		// se le agrega un hash para el manejo de versiones
		filename: "bundle.[contenthash].js",
	},
	//extensiones con las que trabaja el proyecto
	mode: "development",
	resolve: {
		extensions: [".js"],
		//sirve para evitar la navegacion entre carpetas y solo colocar un alias
		alias: {
			"@utils": path.resolve(__dirname, "src/utils"),
			"@templates": path.resolve(__dirname, "src/templates"),
			"@styles": path.resolve(__dirname, "src/styles"),
			"@images": path.resolve(__dirname, "src/assets/images"),
		},
	},
	//se establecen las reglas de los archivos de proyecto
	module: {
		rules: [
			{
				//tipo de extension a trabajar
				test: /\.m?js$/,
				//excluir los archivos que no queremos
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			//regla para el css
			{
				test: /\.css|.scss$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
			},
			{
				test: /\.png|.jpg$/,
				//type de generacion e archivos es documental
				//https://webpack.js.org/configuration/module/#ruletype
				type: "asset/resource",
				generator: {
					filename: "static/images/[hash][ext][query]",
				},
			},
		],
	},
	//seccion plugins
	plugins: [
		new HtmlWebpackPlugin({
			//configuracion plugin
			inject: true, //inyecta el Bundle
			template: "./public/index.html", //La ruta al template Html
			filename: "./index.html", // Nombre final del archivo
		}),
		//plugin para unificacion de css en varios documentos en uno solo
		new MiniCssExtractPlugin({
			filename: "./assets/prueba.[contenthash].css",
		}),
		//solo sirve para copiar archivos de un lado a otro
		new CopyWebpackPlugin({
			patterns: [
				{
					//le decimos donde se encuentran nuestros archivos que deseamos mover
					from: path.resolve(__dirname, "src", "assets/images"),
					to: "assets/images",
				},
			],
		}),
		new Dotenv(),
	],
	//optimization de codigo para Css y js (**no necesario para modo dev)
	// optimization: {
	// 	minimize: true,
	// 	minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	// },
};
