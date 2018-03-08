const path = require('path');

module.exports = (workfolder, options) => {
    return new Docpiler(workfolder, options);
    
}

function Docpiler (workfolder, options = {}) {
    this.state = {
        src: path.resolve(workfolder, (options.src ? options.src : 'src')),
        templates: path.resolve(workfolder, (options.templates ? option.templates : 'templates')),
        dist: path.resolve(workfolder, (options.dist ? options.dist : 'dist'))        
    };

    this.tasks = [];

    this.do = (task, options) => {
        options = options ? options : {};
        if (typeof task === "function")
            this.tasks.push({func:task, options});
        else 
            this.tasks.push({func:require( './modules/docpiler-' + task), options});
    }    
    
    this.build = async () => {
        for(var iTask = 0; iTask < this.tasks.length; iTask++) {
            let task = this.tasks[iTask];           
            
            if (task.func.length == 2) {
                await task.func(this.state, task.options);
            } else {
                for( var iFile = 0; iFile < this.state.files.length; iFile++) {
                    file = this.state.files[iFile];
                    await task.func(file, this.state, task.options);
                }
            }    

            console.log('\n' + task.name + ' -> ' );
            console.log(JSON.stringify(this.state, null, '  '));           
        };
    }    
}

