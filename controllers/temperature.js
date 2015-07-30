var mongoose = require( 'mongoose' );
var Temp = mongoose.model( 'Temperature' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    default: function( req, res ){
        res.render( 'index', { data: { page: 'default' } } );
    },
    post: function( req, res ){
        var temperaturedata = {
            device: {
                id: req.body.device.id,
                battery: req.body.device.battery
            },
            account: {
                id: req.body.account.id
            },
            temperatures: {
                //hourly[/*zero based hour*/][/*00,15,30,45*/]
                //hourly[req.body.hour][req.body.minute]: req.body.temperature
                // hourly: {
                //     req.body.hour: {
                //         req.body.minute: req.body.temperature
                //     }
                // }
            }
        };
    },
    deviceHistory: function( req, res ){
        var deviceid = decodeURIComponent( req.params.id );
        Temp.find( { device: { id: deviceid } } ).exec( function( err, temps ){
            res.json( Response.code( err, temps ), Response.data( err, temps ) );
        });
    },
    deviceStatus: function( req, res ){
        //return last update from device. determine if in acceptable response time
    },
};
