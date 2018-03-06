const readdir = require('./readdir.js');
const fs = require('fs-extra');
const path = require('path');
const fm = require('front-matter');
const pug = require('pug');
var md = require('markdown-it')();


function Secretary (workfolder, options = {}) {
    this.state = {
        src: path.resolve(workfolder, (options.src ? options.src : 'src')),
        templates: path.resolve(workfolder, (options.templates ? option.templates : 'templates')),
        dist: path.resolve(workfolder, (options.dist ? options.dist : 'dist'))        
    };

    this.tasks = [];

    this.do = (action, perfile = false) => {
        this.tasks.push({perfile, action});
    }
    this.doPerFile = (action) => {
        this.do(action, true)
    }
    
    this.run = async () => {
        for(var i = 0; i < this.tasks.length; i++) {
            task = this.tasks[i];
            console.log('\n' + i );            

            if (task.perfile) {
                await this.state.files.forEach( (file) => {task.action(file, this.state)} );
            } else {
                await task.action(this.state);
            }
            console.log('\n' + i );
            console.log(JSON.stringify(this.state, null, '  '))            
            
        };
    }
    
}

var tasks = [];

var secretary = new Secretary('./examples/static-site');

secretary.do(
   async (state) => { 
        state.files = (await readdir(state.src)).map( (file) => {
            return { location: { abs: file, rel: path.relative(state.src, file) } }
        })
    }
)

secretary.doPerFile( (file, state) => file.data = fs.readFileSync(file.location.abs, 'utf8') )

secretary.doPerFile( (file, state) => file.data = fm(file.data) )

secretary.doPerFile( (file, state) => file.data.body = md.render(file.data.body) );

secretary.doPerFile( (file, state) => {
        template = (file.data.attributes.template ? file.data.attribures.template : 'default') + '.pug';        
        file.data.body = pug.renderFile(path.resolve(state.templates, template), file)        
});

secretary.doPerFile( (file, state) => {
    var filename = path.resolve(state.dist, file.location.rel)
    filename = path.resolve(path.dirname(filename), path.basename(filename, path.extname(filename))) + '.html';    
    fs.ensureDirSync(path.dirname(filename));
    fs.writeFileSync(filename, file.data.body) ;
});


secretary.run();