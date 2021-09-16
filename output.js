const genhtml = require( `./genhtml` );

module.exports = function( text ) { require( `fs` ).writeFile( `./output.html`, genhtml.generateHTML( text ), function( err ) { if ( err ) { throw err; } } ); };