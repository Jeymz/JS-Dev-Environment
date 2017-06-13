import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackMd5Hash from "webpack-md5-hash";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default {
	debug: true,
	devtool: "source-map",
	noInfo: false,
	entry: {
		vendor: path.resolve(__dirname, "src/vendor"),
		main: path.resolve(__dirname, "src/index")
	},
	target: "web",
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
		filename: "[name].[chunkhash].js"
	},
	plugins: [
		// Generate an external css file with a hash in the filename
		new ExtractTextPlugin("[name].[contenthash].css"),

		// Hash the files using MD5 so that their names change when the content changes.
		new WebpackMd5Hash(),

		// Use CommonsChunkPlugin to create a seperate bundle
		// of vendor libraries so that they're cached seperately
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor"
		}),

		// HTML Webpack Plugin
		new HtmlWebpackPlugin({
			template: "src/index.html",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttrivutes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			trackJSToken: 'c067cad437964b7990348d83379941e7'
		}),

		// Eliminate duplicate packahed when generating bundles
		new webpack.optimize.DedupePlugin(),

		// Minify JS
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ["babel"]},
			{test: /\.css$/, loader: ExtractTextPlugin.extract("css?sourceMap")}
		]
	}
}
