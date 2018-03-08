var md = require('markdown-it')();

module.exports = (file, state, opts) => { 
    file.data.body = md.render(file.data.body);
}
