var mongoose = require( 'mongoose' );
var Location = mongoose.model( 'Location' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    addLocation: function( req, res ){
        //add auth check
        var locationdata = {
                name: req.body.name,
				address: {
					company: req.body.address.company,
					address1: req.body.address.address1,
					address2: req.body.address.address2,
					city: req.body.address.city,
					state: req.body.address.state,
					zip: req.body.address.zip,
					coords: req.body.address.coords
				}
            };
        var location = new Location(locationdata);
        location.save();
        res.send(locationdata);
    },
	getLocationById: function( req, res ){
		var id = decodeURIComponent( req.params.id );
		Location.find( { _id: id } ).exec( function( err, location ){
			res.json( Response.code( err, location ), Response.data( err, location ) );
		});
	}
};
