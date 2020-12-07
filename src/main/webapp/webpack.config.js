const path = require('path');
let mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
let out_path = mode === 'development' ? './static/dev' : './static/prod';

module.exports = {
    mode: mode,
    entry: './static/js/scripts.js',
    output: {
        path: path.resolve(__dirname, out_path),
        filename: 'index.js'
    }
};