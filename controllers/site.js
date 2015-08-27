var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );
var Location = mongoose.model( 'Location' );
var Response = require( __dirname + '/../lib/Response' );

module.exports = {
	login: function( req, res ){
		res.render( 'index', { data: { page: 'login' } } );
	},
	home: function( req, res ){
		var username = decodeURIComponent( req.params.user );
        User.findOne( { user_name: username } ).exec( function( err, user ){
            res.render( 'index', { data: { page: 'home', user: user } } );
        });
	}
}
