const readdir = require('./readdir.js');
const path = require('path');
const fs = require('fs-extra');

module.exports = async (state, opts) => {  
    
    var themeFiles = await readdir(state.theme);
    
    themeFiles.filter(themeFile => path.extname(themeFile) != '.pug').forEach( (themeFile) => {
        let distFile = path.resolve(state.dist, path.relative(state.theme, themeFile));
        fs.ensureDirSync(path.dirname(distFile));
        fs.copyFileSync(themeFile, distFile);
    });


    var srcFiles = await readdir(state.src);

    // only .md files are to be processed - the rest of the files will be copied directly to dist folder

    srcFiles.filter (srcFile => path.extname(srcFile) != '.md').forEach(srcFile => {
        let distFile = path.resolve(state.dist, path.relative(state.src, srcFile));
        fs.ensureDirSync(path.dirname(distFile));
        fs.copyFileSync(srcFile, distFile );       
    });

    state.files = srcFiles.filter(srcFile => path.extname(srcFile)=='.md').map( (srcFile) => {
        
        // retrieve relative path
        let distFile = path.resolve(state.dist, path.relative(state.src, srcFile));
        // remove relative path extension        
       
        distFile = path.join(path.dirname(distFile), path.basename(distFile, path.extname(distFile))) + '.html'; 

        return { location: { src: srcFile, dist: distFile } }
    })  
}