const readdir = require('./readdir.js');
const path = require('path');

module.exports = async (state, opts) => {    
    state.files = (await readdir(state.src)).map( (file) => {
        return { location: { abs: file, rel: path.relative(state.src, file) } }
    })  
}