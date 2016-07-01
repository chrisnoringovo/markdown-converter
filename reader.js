var q = require('q');
var fs = require('fs'); 
var glob = require("glob")
var _path = require('path');

module.exports = {
    readDir : readDir, 
    readFile : readFile
};

function readFile(path){

    var deferred = q.defer();

    fs.readFile( path,'utf8', function(err,data){
        if(!err) {
            var name = _path.parse( _path.basename(path) ).name + '.html';
            deferred.resolve( { filename : name, data : data} );
        } else {
            deferred.reject( err );
        }
    })

    return deferred.promise;
}

function readDir(path){
    var deferred = q.defer();

    glob(path, {}, function (err, files) {
        
        if(!err) { 
            var files = files.map(function(file){
                return './' + file; 
            })
            deferred.resolve( files ); 
        }
        else {
            deferred.reject( err )
        }
        
    })

    return deferred.promise;
}