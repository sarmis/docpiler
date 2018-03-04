const readdir = require('./readdir.js');
const fs = require('fs');
const fm = require('front-matter');
const pug = require('pug');
// node.js, the same, but with sugar:
var md = require('markdown-it')();

var tasks = [];

tasks.push( async (state) => { 
    state.files = await readdir('./examples/static-site/src') 
} );

tasks.push( async (state) => { 
    state.files = state.files.map( (file) => { return { file, data: fs.readFileSync(file, 'utf8') } } ) 
} );

tasks.push( async (state) => {
    state.files.forEach(file => file.data = fm(file.data));
} );

tasks.push( async (state) => { 
    state.files.forEach(file => file.data.body = md.render(file.data.body) );
} );

tasks.push( async (state) => {
    state.files.forEach( file => file.data.body = pug.renderFile('./examples/static-site/template/template.pug', file));
} );


async function run() {
    var state = {};
    for(var i = 0; i < tasks.length; i++) {
        await tasks[i](state);
        console.log('\n' + i );
        console.log(JSON.stringify(state, null, '  '))
    }
}

run();