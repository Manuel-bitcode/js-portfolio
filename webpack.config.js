const path = require("path");

//plugin para inyectar js,css y nos fcilita enlazar los bundles a nuestro template HTML
const HtmlWebpackPlugin = require("html-webpack-plugin");
//plugin para unificar el css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//plugin para copia de archivos
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
	//elemento inicial de la App
	entry: "./src/index.js",
	//hacia donde vamos enviar lo que prepara webpack por defecto es dist
	output: {
		//path donde va a parar la carpeta contenedora
		path: path.resolve(__dirname, "dist"),
		//nombre al resultante del js unificado
		filename: "bundle.js",
	},
	//extensiones con las que trabaja el proyecto
	resolve: {
		extensions: [".js"],
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
			filename: "./prueba.css",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					//le decimos donde se encuentran nuestros archivos que deseamos mover
					from: path.resolve(__dirname, "src", "assets/images"),
					to: "assets/images",
				},
			],
		}),
	],
};
