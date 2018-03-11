const pug = require('pug');
const path = require('path');

module.exports = (file, state, opts) => {
    try {
        template = (file.data.attributes.template ? file.data.attributes.template : 'file') + '.pug';        
        file.data.body = pug.renderFile(path.resolve(state.templates, template), file)
    } catch (e) {
        console.log('render-pug: ' + JSON.stringify(file) + '\n\n' + e.message)
        throw e;
    }
};