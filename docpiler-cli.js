#!/usr/bin/env node
var docpiler = require('docpiler');
var path     = require('path');
var fs       = require('fs');

var workingfolder = process.argv[2] ? process.argv[2] : '.';

console.log('docpiling: ' + path.resolve(workingfolder));

var configFile = path.resolve(workingfolder, 'docpiler.config');
var config = {};

if (fs.existsSync(configFile)) 
    var config = fs.readFileSync(configFile);
else 
    var config = {
        tag: 'default',
        options: { 
            src: 
                fs.existsSync(path.resolve(workingfolder, 'src')) ? 
                path.resolve(workingfolder, 'src') : 
                path.resolve(workingfolder,'source'),
            theme: path.resolve(workingfolder,'theme'),
            dist: path.resolve(workingfolder,'dist')
        },
        tasks: [
            {task: 'find' },
            {task: 'import' },            
            {task: 'parse-frontmatter' },
            {task: 'parse-markdown' },
            {task: 'index' },
            {task: 'render-pug' },
            {task: 'export' }
        ]
    };

console.log('source : ' + config.options.src  );
console.log('theme  : ' + config.options.theme);
console.log('dist   : ' + config.options.dist );
console.log('tasks  : ' + config.tasks.map(task => task.task).join(' -> ') );

var doc = docpiler(config.options);

config.tasks.forEach( (task) => {
    doc.do(task.task, task.options);
});    


function build() {
    doc.build();
    console.log('\nReady!')
}

build()

if (process.argv[3] == "--watch") {
    console.log("Watching...")
    fs.watch(config.options.src, {recursive: true}, (event, file) => {
        console.log(`Changed: ${file}`)
        build();
    });
    fs.watch(config.options.theme, {recursive: true}, (event, file) => {
        console.log(`Changed: ${file}`)
        build();
    })

}