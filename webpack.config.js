var webpack = require('webpack');
var path = require('path');
module.exports = {
    context: __dirname,
    entry: getEntrySources(['./src/main.js']),
    output: {
        filename: 'build/bundle.js'
    },
    devtool: 'eval',
    module: {
        preLoaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'source-map'
            }
        ],
        loaders: [
            {
                test: /\.scss$/,
                loaders: [
                    'style',
                    'css',
                    'autoprefixer?browsers=last 3 versions',
                    'sass?outputStyle=expanded'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'url?limit=8192',
                    'img'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loaders: [
                    'react-hot',
                    'babel?presets[]=stage-0,presets[]=react,presets[]=es2015,plugins[]=react-html-attrs,plugins[]=transform-decorators-legacy,plugins[]=transform-class-properties',
                ]
            },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"}
        ],
        externals: {
            foundation: 'Foundation'
        }
    },
    plugins: getPlugins(),
    sassLoader: {
        includePaths: [path.resolve(__dirname, './src')],
        resolve: {
            root: path.resolve(__dirname),
            modulesDirectories: ['node_modules', 'bower_components'],
            extensions: ['', '.js', '.json', '.scss', '.html'],
            alias: {}
        }
    } 
};

function getPlugins() {
    var plugins = [];
   /* plugins.push(new webpack.DefinePlugin({
        'process.env': {
            GDS_API: process.env.GDS_API,
            SCHOOL_ID: process.env.SCHOOL_ID
        }
    }));*/
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    if (process.env.NODE_ENV === 'production') {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    }
    return plugins;
}

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:3001');
        sources.push('webpack/hot/only-dev-server');
    }
    sources.push('whatwg-fetch');
    sources.push('foundation-sites');
    return sources;
}
