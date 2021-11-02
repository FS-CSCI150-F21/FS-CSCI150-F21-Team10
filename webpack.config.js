const path = require ('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'bundle.js'
    }

};