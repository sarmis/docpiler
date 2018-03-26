fs = require('fs-extra');
path = require('path');

module.exports = (file, state, opts) => {
    file.data = fs.readFileSync(file.location.src, 'utf8')
}