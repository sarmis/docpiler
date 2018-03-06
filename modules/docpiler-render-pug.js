const pug = require('pug');
const path = require('path');

module.exports = (file, state, opts) => {
    template = (file.data.attributes.template ? file.data.attribures.template : 'default') + '.pug';        
    file.data.body = pug.renderFile(path.resolve(state.templates, template), file)        
};