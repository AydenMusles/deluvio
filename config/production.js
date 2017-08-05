const webpack = require('webpack');
const path = require('path');

module.exports = {
	entry: './scripts/app.js',
	devtool: 'eval',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, '../theme/assets')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader?presets[]=es2015&presets[]=react&plugins[]=transform-object-rest-spread']
			}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
			screw_ie8: true,
			keep_fnames: true
		},
			compress: {
			screw_ie8: true
		},
			comments: false
		})
	]
}


