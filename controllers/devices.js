var mongoose = require( 'mongoose' );
var Device = mongoose.model( 'Device' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    /**
        -------- views --------
    **/

    renderDevicesPage: function( req, res ){
        Device.find().exec( function( err, devices ){
            res.render( 'index', { data: { page: 'devices', devices: devices } } );
        });
    },
    renderDeviceDetails: function( req, res ){
        var id = decodeURIComponent( req.params.id );
        Device.findOne( { _id: id } ).exec( function( err, device ){
            res.render( 'index', { data: { page: 'device-detail', device: device } } );
        });
    },
    renderDeviceAdd: function( req, res ){
        res.render( 'index', { data: { page: 'device-new' } } );
    },

    /**
        -------- API --------
    **/

    /* -------- inserts -------- */
    addDevice: function( req, res ){
        //add auth check
        var devicedata = {
                battery: req.body.battery,
				name: req.body.name,
				version: req.body.version
            };
        var device = new Device(devicedata);
        device.save();
        res.send(devicedata);
    },

    /* -------- gets -------- */
    getDeviceById: function( req, res ){
        var id = decodeURIComponent( req.params.id );
        Device.findOne( { _id: id } ).exec( function( err, device ){
            res.json( Response.code( err, device ), Response.data( err, device ) );
        });
    },
    getAllDevices: function( req, res ){
        Device.find( function( err, devices ){
            res.json( Response.code( err, devices ), Response.data( err, devices ) );
        });
    },

    /* -------- updates -------- */
    updateDeviceName: function( req, res ){
        Device.update( { _id: req.body.id }, { '$set': { 'name': req.body.name, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('account updated: ' + req.body.accountid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },
    updateDeviceBattery: function( req, res ){
        Device.update( { _id: req.body.id }, { '$set': { 'battery': req.body.battery, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('account updated: ' + req.body.accountid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },
    updateDeviceUName: function( req, res ){
        Device.update( { _id: req.body.id }, { '$set': { 'uname': req.body.uname, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('account updated: ' + req.body.accountid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },
    updateDeviceVersion: function( req, res ){
        Device.update( { _id: req.body.id }, { '$set': { 'version': req.body.version, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('account updated: ' + req.body.accountid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },

    /* -------- deletes -------- */
    deleteDeviceById: function( req, res ){
        Device.findOneAndRemove( { _id: req.body.id }, function( err, user ){
            res.json( Response.code( err, user ), Response.data( err, user ) );
        });
    }
};
