const readdir = require('./readdir.js');
const path = require('path');

module.exports = async (state, opts) => {    
    state.files = (await readdir(state.src)).map( (file) => {
        
        // retrieve relative path
        var rel = path.relative(state.src, file);
        // remove relative path extension
        rel = path.join(path.dirname(rel), path.basename(rel, path.extname(rel))); 

        return { location: { abs: file, rel: rel } }
    })  
}