module.exports = function( list, f ) { return list.map( ( i ) => f( i ) ).join( `` ); };