var md = require('markdown-it')();

module.exports = (file, state, opts) => { 
    if (! (file.data && file.data.body))
        return;
        
    file.data.body = md.render(file.data.body);
    if (file.data.excerpt)
        file.data.excerpt = md.render(file.data.excerpt);
}
