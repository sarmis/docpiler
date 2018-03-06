const Docpiler = require('./docpiler.js');

var doc = Docpiler('./examples/static-site');

doc.do('find', {})
doc.do('import')
doc.do('parse-frontmatter')
doc.do('parse-markdown')
doc.do(require('./modules/docpiler-render-pug'))
doc.do('export')

doc.build();

