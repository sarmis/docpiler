const pug = require('pug');
const path = require('path');

module.exports = (file, state, opts) => {

    if (!file.data)
        return; 

    try {
        layout = (file.data.attributes.layout ? file.data.attributes.layout : 'post') + '.pug';        
        file.data.body = pug.renderFile(path.resolve(state.theme, layout), file)
    } catch (e) {
        console.log('render-pug: ' + JSON.stringify(file) + '\n\n' + e.message)
        throw e;
    }
};