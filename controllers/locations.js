var mongoose = require( 'mongoose' );
var Location = mongoose.model( 'Location' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    /**
        -------- views --------
    **/

    renderLocationsPage: function( req, res ){
        Location.find().exec( function( err, locations ){
            res.render( 'index', { data: { page: 'locations', locations: locations } } );
        });
    },
    renderLocationDetails: function( req, res ){
        Location.findOne().exec( function( err, location ){
            res.render( 'index', { data: { page: 'location-detail', location: location } } );
        });
    },
    renderLocationAdd: function( req, res ){
        res.render( 'index', { data: { page: 'location-new' } } );
    },

    /**
        -------- API --------
    **/

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
					//coords: req.body.address.coords
				}
            };
        var location = new Location(locationdata);
        location.save();
        console.log(locationdata);
        res.send(locationdata);
    },

    /* -------- gets -------- */
	getLocationById: function( req, res ){
		var id = decodeURIComponent( req.params.id );
		Location.find( { _id: id } ).exec( function( err, location ){
			res.json( Response.code( err, location ), Response.data( err, location ) );
		});
	},
    getLocationsByAccount: function( req, res ){
        var accountid = decodeURIComponent( req.params.id );
        Location.find( { account_id: accountid } ).exec( function( err, locations ){
			res.json( Response.code( err, locations ), Response.data( err, locations ) );
		});
    },
    getAllLocations: function( req, res ){
        Location.find( function( err, locations ){
            res.json( Response.code( err, locations ), Response.data( err, locations ) );
        });
    },

    /* -------- updates -------- */
    updateWifiInfo: function( req, res ){
        Location.update( { _id: req.body.locationid }, { '$set': { 'wifi.ssid': req.body.ssid, 'wifi.password': req.body.password, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('location update: ' + req.body.locationid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },
    updateAddress: function( req, res ){
        //test me
        Location.update( { _id: req.body.locationid },
            { '$set': {
                'address.company': req.body.company,
                'address.address1': req.body.address1,
                'address.address2': req.body.address2,
                'address.city': req.body.city,
                'address.state': req.body.state,
                'address.zip': req.body.zip,
                'address.coords': req.body.coords,
                'metadata.last_updated': new Date() }
            }, function(error, status){
            console.log('location update: ' + req.body.locationid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },
    addDevice: function( req, res ){
        Location.findOne( { _id: req.body.locationid } ).exec( function( err, location ){
			//res.json( Response.code( err, locations ), Response.data( err, locations ) );
            var devices = location.devices || [],
                deviceid = req.body.deviceid,
                added = false;
            if(devices.indexOf(deviceid) === -1 && deviceid !== null){
                devices.push(deviceid);
                added = true;
            }
            if(added){
                Location.update( { _id: req.body.locationid }, { '$set': { 'devices': devices, 'metadata.last_updated': new Date() } }, function(error, status){
                    console.log('location update: ' + req.body.locationid + ' status: ' + status);
                    if(status === 1){
                        res.send('updated');
                    }else{
                        res.send('error:'+ error);
                    }
                });
            }else{
                res.send('device already connected to account');
            }
		});
    },
    removeDevice: function( req, res ){

    },
    addUser: function( req, res ){
        Location.findOne( { _id: req.body.locationid } ).exec( function( err, location ){
			//res.json( Response.code( err, locations ), Response.data( err, locations ) );
            var users = location.users || [],
                userid = req.body.userid,
                added = false;
            if(users.indexOf(userid) === -1 && userid !== null){
                users.push(userid);
                added = true;
            }
            if(added){
                Location.update( { _id: req.body.locationid }, { '$set': { 'users': users, 'metadata.last_updated': new Date() } }, function(error, status){
                    console.log('location update: ' + req.body.locationid + ' status: ' + status);
                    if(status === 1){
                        res.send('updated');
                    }else{
                        res.send('error:'+ error);
                    }
                });
            }else{
                res.send('user already connected to account');
            }
		});
    },
    removeUser: function( req, res ){

    },
    updateBilling: function( req, res ){

    },
    updateName: function( req, res ){
        //test me
        Location.update( { _id: req.body.locationid }, { '$set': { 'name': req.body.name, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('location update: ' + req.body.locationid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
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
        Location.findOneAndRemove( { _id: req.body.id }, function( err, user ){
            res.json( Response.code( err, user ), Response.data( err, user ) );
        });
    }
};
