const path = require('path');

module.exports = (workfolder, options) => {
    return new Docpiler(workfolder, options);    
}

//Todo refactor this entry point to remove workfolder...
function Docpiler (options = {}) {
    this.state = {
        src: path.resolve(options.src ? options.src : 'src'),
        theme: path.resolve(options.theme ? options.theme : 'theme'),
        dist: path.resolve(options.dist ? options.dist : 'dist')        
    };

    this.tasks = [];

    this.do = (task, options) => {
        options = options ? options : {};
        if (typeof task === "function")
            this.tasks.push({func:task, options, meta:{task: null}});
        else 
            this.tasks.push({func:require( './modules/docpiler-' + task), options, meta:{task}});
    }    
    
    this.build = async () => {
        for(var iTask = 0; iTask < this.tasks.length; iTask++) {
            let task = this.tasks[iTask];           
            console.log(task.meta.task)
            if (task.func.length == 2) {
                await task.func(this.state, task.options);
            } else {
                for( var iFile = 0; iFile < this.state.files.length; iFile++) {
                    file = this.state.files[iFile];
                    await task.func(file, this.state, task.options);
                }
            }    
        };
        
    }    
}

