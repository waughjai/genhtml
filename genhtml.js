const merge = require( `./merge` );

const isString = ( i ) => typeof i === `string`;

const indent = ( indents ) => ( indents < 1 ) ? `` : `\t${ indent( --indents ) }`;

module.exports = {
    generateHTML: function( data, indents, inline ) {
        if ( indents === undefined ) {
            indents = 0;
        }

        if ( inline === undefined ) {
            inline = false;
        }

        if ( isString( data ) ) {
            return data;
        }
        else if ( Array.isArray( data ) && data.length > 0 ) {
            if ( isString( data[ 0 ] ) ) {
                const hasAtts = data.length > 1 && typeof data[ 1 ] === `object` && !Array.isArray( data[ 1 ] );
                const atts = ( hasAtts ) ? `${ Object.entries( data[ 1 ] ).map( ( a ) => ` ${ a[ 0 ] }="${ a[ 1 ] }"` ).join( `` ) }` : ``;
                const content = ( hasAtts ) ? ( ( data.length > 2 ) ? data[ 2 ] : `` ) : ( ( data.length > 1 ) ? data[ 1 ] : `` );
                const indentText = `${ ( inline ) ? `` : `\n` }${ indent( indents ) }`;
                const endIndentText = ( !isString( content ) ) ? `${ indentText }` : ``;
                return `${ indentText }<${ data[ 0 ] }${ atts }>${ this.generateHTML( content, ++indents ) }${ endIndentText }</${ data[ 0 ] }>`;
            }
            else {
                return merge( data, ( i ) => this.generateHTML( i, indents ) );
            }
        }
        return ``;
    },
    generateDateHTML: function( date ) {
        if ( typeof date === `string` ) {
            const d = new Date( date );
            if ( isNaN( d.getDate() ) ) {
                return date;
            }
            return this.generateHTML( [ `time`, { datetime: `${ d.getFullYear() }-${ d.getMonth().toString().padStart( 2, `0` ) }-${ d.getDate().toString().padStart( 2, `0` ) }` }, date ], 0, true );
        }
        else if ( typeof date === `object` ) {
            return `${ this.generateDateHTML( date.start ) } – ${ this.generateDateHTML( date.end ) }`;
        }
        return ``;
    }
};