var showdown = require('showdown');
var reader = require('./reader');
var q = require('q');
var fs = require('fs');

var readFile = reader.readFile;
var readDir = reader.readDir;

converter = new showdown.Converter();

readDir("docs/**/*.md").then(function(files){
    var promises = [];
    

    files.forEach(function(file){
       
        promises.push( readFile(file) );
    });
    
    q.all(promises).then(function(results){
        results.forEach(function(result){
            var html = converter.makeHtml( result.data );
            console.log( result.filename, html );
            fs.writeFile( './out/'+ result.filename, html, function(err){
                if(!err) {
                    console.log('saved');
                } else {
                    console.log(err);
                }
            } );

            
           
        });
    })
    
});



