const fs = require('fs');
const path = require('path');


exports.readdirRec = readdirRec;

function readdirRec (dir) {
    return _readdir(dir)
        .then(function(list) {
            return Promise.all(
                list.map(function(file) {
                    file = path.resolve(dir, file);
                        return _statIsDirectory(file)
                            .then(function(isFolder) {
                                if (isFolder) {
                                    return readdirRec(file);
                                } else {
                                    return file;
                                }
                            });
                }));

        }).then(function(results) {
            // flatten the array of arrays
            return Array.prototype.concat.apply([], results);
        });
}

const _readdir = (path) => {
    return new Promise( (resolve, reject) => {
        fs.readdir(path, (err, items) => {
            if (err) 
                reject(err);
            else
                resolve(items);
        });
    })
}

function _statIsDirectory (path) {
    return new Promise( (resolve, reject) => {
        fs.stat(path, (err, stat) => {
            if(err)
                reject(err);
            else {
                resolve(stat.isDirectory());
            }
        })
    });
}