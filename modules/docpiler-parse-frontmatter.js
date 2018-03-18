const fm = require('front-matter');
const path = require('path');

module.exports = (file, state, opts) => {
    file.data = fm(file.data);
    
    // If <!-- more --> is found in data then select 
    var idx = file.data.body.indexOf("<!-- more -->");

    if (idx > -1) {
        file.data.excerpt = file.data.body.slice(0, idx);
        file.data.body = file.data.body.slice(0, idx) +  '\n\r' + file.data.body.slice(idx+14)
    }

    file.data.attributes.title = 
        file.data.attributes.title ? 
        file.data.attributes.title : 
        path.basename(file.location.rel);
}