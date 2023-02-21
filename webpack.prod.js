const { ESBuildMinifyPlugin } = require('esbuild-loader')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
	mode: 'production',
	devtool: false, // eval
	plugins: [],
	optimization: {
		minimize: true,
		minimizer: [
			// new BundleAnalyzerPlugin({
			// 	openAnalyzer: false,
			// 	analyzerPort: 8889,
			// }),
			new ESBuildMinifyPlugin({
				target: 'es2015', // Syntax to compile to (see options below for possible values)
				minify: true,
				css: true,
				sourcemap: false,
				minifyWhitespace: true,
				minifySyntax: true,
				minifyIdentifiers: true,
			}),
			new HtmlWebpackPlugin({
				filename: path.resolve(__dirname, 'dist', 'index.html'),
				template: 'src/index.ejs',
				inject: true,
				hash: true,
			}),
			new webpack.DefinePlugin({
				APP_STAGE: JSON.stringify('prod'),
			}),
		],
	},
})
