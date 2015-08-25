var mongoose = require( 'mongoose' );
var Response = require( __dirname + '/../lib/Response' );

module.exports = {
	login: function( req, res ){
		res.render( 'index', { data: { page: 'login' } } );
	}
}
