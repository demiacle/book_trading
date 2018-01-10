const path = require('path');

module.exports = {
    entry: './src/typescripts/hello.tsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'eslint-loader!babel-loader!ts-loader'
            },
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};