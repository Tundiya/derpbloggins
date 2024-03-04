const path = require('path');

module.exports = {
    mode: 'development',
    entry: './scripts.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'bundle.js' // Output bundle filename
    },
    module: {
        rules: [
            // Define loaders for different file types
            {
                test: /\.js$/, // Apply this loader to all JavaScript files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Use Babel for transpilation
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};