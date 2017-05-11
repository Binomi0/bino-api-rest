var webpack = require('webpack')
var path = require('path')

module.exports = {

    entry: {
        app: './src/app.js'
    },
    output: {   
        //path: path.resolve(__dirname, 'wamp/www/karatesantapola/public'),     
        filename: 'public/build/bundle.js',
        sourceMapFilename: 'public/build/bundle.map',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {                
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            hash: 'sha512',
                            digest: 'hex',
                            name: '[hash].[ext]'
                        }, 
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true,                            
                        },
                    },
                ],  
            }, {
                test: /\.(scss|css)$/,
                include: [
                    path.resolve(__dirname, './src/stylesheets'),
                ],
                use: [
                    {
                        loader: 'style-loader'
                }, {
                        loader: 'css-loader' 
                }, {
                        loader: 'sass-loader',                        
                }]
            }
        ]
    }
}