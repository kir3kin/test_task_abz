const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MinimazierCssPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin");

const isProd = process.env.NODE_ENV === 'production'


const cssLoaders = extra => {
	const loaders = [
		{ 
			loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
		},
		'css-loader'
	]
	if (extra) loaders.push(extra)
	return loaders
}

const fileLoader = folder => ({
	type: 'asset/resource',
	generator: {
		filename: `assets/${folder}/[hash][ext][query]`
	}
})


module.exports = {
	mode: isProd ? 'production' : 'development',
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './index.tsx'
	},
	output: {
		filename: 'assets/js/[name].[fullhash].js',
		path: path.resolve(__dirname, 'build'),
		clean: true
	},
	resolve: {
		extensions: ['.js', '.scss', '.ts', '.tsx'],
		alias: {
			'@fonts': path.resolve(__dirname, 'src/assets/fonts'),
			'@scss': path.resolve(__dirname, 'src/assets/scss'),
			'@scss-media': path.resolve(__dirname, 'src/assets/scss/media'),
			'@scss-utils': path.resolve(__dirname, 'src/assets/scss/utils'),
			'@images': path.resolve(__dirname, 'src/assets/images')
		}
	},
	devtool: isProd ? false : 'inline-source-map',
	devServer: {
		port: 3644,
		open: true
	},
	optimization: {
		usedExports: true,
		splitChunks: {
			chunks: 'all'
		},
		minimize: isProd,
		minimizer: [
			new MinimazierCssPlugin(),
			new TerserWebpackPlugin()
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/css/[name].[fullhash].css',
			chunkFilename: 'assets/css/[id].[fullhash].css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					context: path.resolve(__dirname, 'src'),
					from: 'public/**/*',
					to: path.resolve(__dirname, 'build', '[name][ext]')
				}
			]
		}),
		new CompressionPlugin({
			test: /\.(js|css|ttf|woff2|svg|webp)$/i,
			algorithm: 'gzip',
			filename: '[path][base].gz'
		}),
		new CompressionPlugin({
			test: /\.(js|css|ttf|woff2|svg|webp)$/i,
			algorithm: 'brotliCompress',
			filename: '[path][base].br'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: cssLoaders()
			},
			{
				test: /\.s[ac]ss$/i,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.tsx?$/i,
				exclude: '/node_modules/',
				loader: 'ts-loader',
			},
			{
        test: /\.(svg|webp)$/i,
				...fileLoader('images')
      },
			{
				test: /\.(ttf|woff2)$/i,
				...fileLoader('fonts')
			}
		]
	}
}