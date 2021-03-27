const path = require("path");

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
};
