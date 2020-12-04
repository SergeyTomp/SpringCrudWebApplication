const path = require('path');
let out_path = process.env.NODE_ENV === 'development' ? './src/main/resources/static/dev' : './src/main/resources/static/prod';
module.exports = {
    mode: 'development',
    entry: './src/main/resources/static/js/scripts.js',
    output: {
        path: path.resolve(__dirname, out_path),
        filename: 'index.js'
    }
};