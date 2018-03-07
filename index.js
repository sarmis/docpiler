const Docpiler = require('./docpiler.js');

var doc = Docpiler('./examples/static-site');

doc.do('find', {})
doc.do('import')
doc.do( (file, state, opts) => {file.data += ' __I told you so!!!__ '} )
doc.do('parse-frontmatter')
doc.do('parse-markdown')
doc.do( (file, state, opts) => {file.data.body += '<u>Yeap</u>'} )
//doc.do('render-pug')
doc.do(require('./modules/docpiler-render-pug'))
doc.do('export')

doc.build();

