var mongoose = require( 'mongoose' );
var Location = mongoose.model( 'Location' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    /* -------- inserts -------- */
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

    /* -------- gets -------- */
	getLocationById: function( req, res ){
		var id = decodeURIComponent( req.params.id );
		Location.find( { _id: id } ).exec( function( err, location ){
			res.json( Response.code( err, location ), Response.data( err, location ) );
		});
	},
    getAllLocations: function( req, res ){
        Location.find( function( err, locations ){
            res.json( Response.code( err, locations ), Response.data( err, locations ) );
        });
    },

    /* -------- updates -------- */
    updateWifiInfo: function( req, res ){

    },
    updateAddress: function( req, res ){

    },
    addDevice: function( req, res ){

    },
    removeDevice: function( req, res ){

    },
    addUser: function( req, res ){

    },
    removeUser: function( req, res ){

    },
    updateBilling: function( req, res ){

    },
    updateName: function( req, res ){

    },
    updatePrimaryUser: function( req, res ){
        Location.update( { _id: req.body.locationid }, { '$set': { 'primary_user': req.body.userid, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('location update: ' + req.body.locationid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },
    updateAccount: function( req, res ){
        Location.update( { _id: req.body.locationid }, { '$set': { 'account_id': req.body.accountid, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('location update: ' + req.body.locationid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        })
    },

    /* -------- deletes -------- */
    deleteLocationById: function( req, res ){
        Location.findOneAndRemove( { _id: req.body.id }, function( err, location ){
            res.json( Response.code( err, location ), Response.data( err, location ) );
        });
    }
};
