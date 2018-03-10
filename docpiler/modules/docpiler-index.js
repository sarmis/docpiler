const path = require('path')
module.exports = (file, state, opts) => {
    var index = state.files.filter( file => file.location && file.location.rel == 'index.md')[0];

    if (!index) {
        index = {location:{rel: 'index.md'}, data:{attributes:{template: 'index'}, links:[] }} 
        state.files.push(index);
    }     

    var url = path.join(
        path.dirname(file.location.rel), 
        path.basename(file.location.rel, path.extname(file.location.rel))
    ); 

    index.data.links.push( { 
        url: url, 
        caption: file.data.attributes.title ? file.data.attributes.title : path.basename(url)
    } );
    
    //file.data.body = pug.renderFile(path.resolve(state.templates, template), file)        
};