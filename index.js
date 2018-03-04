const readdir = require('./readdir.js');


readdir.readdirRec('c:/sarmis/code/rgs.net/server/logicserver')
    .then( (files) => console.log(files) )
    

