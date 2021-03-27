const path = require("path");

//plugin para inyectar js,css y nos fcilita enlazar los bundles a nuestro template HTML
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
	],
};
