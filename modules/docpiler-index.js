const path = require('path')
module.exports = (file, state, opts) => {
    var index = state.files.filter( file => file.location && file.location.rel == 'index.md')[0];

    if (!index) {
        index = {location:{rel: 'index.md'}, data:{attributes:{layout: 'index'}, links:[] }} 
        state.files.push(index);
    }    

    if (file != index) {
        index.data.links.push( { 
            url: file.location.rel, 
            caption: file.data.attributes.title ? file.data.attributes.title : path.basename(url),
            excerpt: file.data.excerpt
        } );
    }
            
};