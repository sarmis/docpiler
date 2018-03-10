const Docpiler = require('../docpiler');

var doc = Docpiler('./static-site');

doc.do('find', {})
doc.do('import')

doc.do('parse-frontmatter')
doc.do('parse-markdown')
doc.do('index')
doc.do('render-pug')
doc.do('export')

doc.build();

