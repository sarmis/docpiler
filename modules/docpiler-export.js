const path = require('path');
const fs = require('fs-extra');

module.exports = (file, state, opts) => {
    fs.ensureDirSync(path.dirname(file.location.dist));
    fs.writeFileSync(file.location.dist, file.data.body);
}