const fm = require('front-matter');
const path = require('path');

module.exports = (file, state, opts) => {
    file.data = fm(file.data);

    file.data.attributes.title = 
        file.data.attributes.title ? 
        file.data.attributes.title : 
        path.basename(file.location.rel);
}