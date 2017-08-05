const webpack = require('webpack');

module.exports = {
	entry: './scripts/app.js',
	devtool: 'eval',
	output: {
		filename: 'app.js',
		publicPath: 'https://localhost:8080/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['react-hot-loader', 'babel-loader?presets[]=es2015&presets[]=react&plugins[]=transform-object-rest-spread']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM": "react-dom",
        })
	],
	devServer: {
		hot: true,
		inline: true,
		https: true,
		port: 8080,
		noInfo: false,
        stats: 'minimal'
	}
}