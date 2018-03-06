fs = require('fs-extra');

module.exports = (file, state, opts) => {
    file.data = fs.readFileSync(file.location.abs, 'utf8')
}