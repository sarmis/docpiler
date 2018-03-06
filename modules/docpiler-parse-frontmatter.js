const fm = require('front-matter');

module.exports = (file, state, opts) => {
    file.data = fm(file.data);
}