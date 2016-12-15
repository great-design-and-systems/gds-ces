var webpack = require('webpack');
module.exports = {
    entry: getEntrySources(['./src/app/js/app.js']),
    output: {
        publicPath: 'http://localhost:3001/',
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
                include: /src/,
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
            }
        ]
    },
    plugins: getPlugins()
};

function getPlugins() {
    var plugins = [];
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            GDS_API: process.env.GDS_API,
            SCHOOL_ID: process.env.SCHOOL_ID
        }
    }));
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

    return sources;
}
