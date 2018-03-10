const Docpiler = require('../../docpiler');

var doc = Docpiler('.');

doc.do('find', {})
doc.do('import')

doc.do('parse-frontmatter')
doc.do('parse-markdown')
doc.do('index')
doc.do('render-pug')
doc.do('export')

doc.build();

