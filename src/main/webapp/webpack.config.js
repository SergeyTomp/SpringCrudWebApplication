const path = require('path');
let out_path = process.env.NODE_ENV === 'development' ? './static/dev' : './static/prod';
module.exports = {
    mode: 'development',
    entry: './static/js/scripts.js',
    output: {
        path: path.resolve(__dirname, out_path),
        filename: 'index.js'
    }
};