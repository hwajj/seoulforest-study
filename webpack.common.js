const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const absolute_path = dir => path.resolve(__dirname, dir)

module.exports = {
	name: 'seoulforest-front',
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: { '@': absolute_path('src') },
	},

	entry: {
		app: ['./src/index.js'],
	}, // 입력

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'esbuild-loader',
				options: {
					loader: 'jsx',
					target: 'es2015',
				},
			},
			{
				test: /\.s?css$/,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				type: 'javascript/auto',
				test: /\.(tsv|glb|png|svg|jpe?g|gif|hdr|json|mp3|mov|woff|woff2|eot|ttf|otf|mp4|webm|ico|usdz)$/,
				loader: 'file-loader',
				options: {
					// name: 'static/media/[name].[hash:8].[ext]',
					// name: '[name].[ext]',
					outputPath: 'assets/',
					esModule: false,
				},
			},
		],
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({ debug: true }),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/utils/lib/model-viewer_lcw.js', to: 'lib' },
				{ from: 'src/utils/lib/draco', to: 'lib/draco' },
				{
					from: 'src/assets/aframe',
					to: 'assets/aframe',
					globOptions: {
						ignore: ['**/models2'],
					},
				},
			],
		}),
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
}
