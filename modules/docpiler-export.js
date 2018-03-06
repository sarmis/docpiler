const path = require('path');
const fs = require('fs-extra');

module.exports = (file, state, opts) => {
    var filename = path.resolve(state.dist, file.location.rel)
    filename = path.resolve(path.dirname(filename), path.basename(filename, path.extname(filename))) + '.html';    
    fs.ensureDirSync(path.dirname(filename));
    fs.writeFileSync(filename, file.data.body) ;
}