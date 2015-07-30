var mongoose = require( 'mongoose' );
var Device = mongoose.model( 'Device' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    addDevice: function( req, res ){
        //add auth check
        var devicedata = {
                battery: 0,
				name: req.body.name,
				uname: req.body.uname,
				version: req.body.version
            };
        var device = new Device(devicedata);
        device.save();
        res.send(devicedata);
    },
    getDeviceById: function( req, res ){
        var id = decodeURIComponent( req.params.id );
        Device.find( { _id: id } ).exec( function( err, device ){
            res.json( Response.code( err, device ), Response.data( err, device ) );
        });
    },
    getAllDevices: function( req, res ){
        Device.find( function( err, devices ){
            res.json( Response.code( err, devices ), Response.data( err, devices ) );
        });
    }
};
