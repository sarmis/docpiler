const path = require('path')
module.exports = (file, state, opts) => {
    var index = state.files.filter( file => file.location && file.location.src == 'index.html' )[0];

    if (!index) {
        index = {
            location:{src: 'index.html',dist: path.resolve(state.dist, 'index.html')}, 
            data:{attributes:{layout: 'index'}, links:[] }
        } 
        state.files.push(index);
    }    

    if ((file != index) && (file.data)) {

        index.data.links.push( { 
            url     : path.relative(state.dist, file.location.dist), 
            caption : file.data.attributes.title ? file.data.attributes.title : path.basename(url),
            category: file.data.attributes.category,
            date    : file.data.attributes.date,
            excerpt : file.data.excerpt            
        } );
    }
            
};