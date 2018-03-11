#!/usr/bin/env node
var docpiler = require('docpiler');
var path = require('path');
var fs =  require('fs');

var workingfolder = process.argv[2] ? process.argv[2] : '.';

console.log('docpiling: ' + path.resolve(workingfolder));

var configFile = path.resolve(workingfolder, 'docpiler.config');

if (fs.existsSync(configFile)) 
    var config = fs.readFileSync(configFile);
else 
    var config = {
        tag: 'default',
        options: { 
            src: fs.existsSync(path.resolve(workingfolder, 'src')) ? 'src' : 'source',
            templates: 'templates',
            dist: 'dist'
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

console.log('config: ' + JSON.stringify(config));
