var mongoose = require( 'mongoose' );
var Temp = mongoose.model( 'Temperature' );
var Response = require( __dirname + '/../lib/Response' );

module.exports = {
    default: function( req, res ){
        res.render( 'index', { data: { page: 'default' } } );
    },

    /* -------- inserts/updates -------- */
    post: function( req, res ){
        var start = new Date(),
            temperaturedata;

        start.setHours(0,0,0,0);

        Temp.find( { "device.id": req.body.device.id, "metadata.date": { $gt: start } } ).exec( function( err, temps ){
            if(temps != undefined) {
                if(temps.length === 0){
                    console.log('no documents today, create one');
                    temperaturedata = {
                        device: {
                            id: req.body.device.id,
                            battery: req.body.device.battery
                        },
                        account: {
                            //id: req.body.account.id
                        }
                    };
                    temperaturedata.temperatures = {};
                    temperaturedata.temperatures['hourly'] = {};
                    temperaturedata.temperatures['hourly'][req.body.hour] = {};
                    temperaturedata.temperatures['hourly'][req.body.hour][req.body.interval] = {};
                    temperaturedata.temperatures['hourly'][req.body.hour][req.body.interval]['value'] = req.body.temperature;
                    temperaturedata.temperatures['hourly'][req.body.hour][req.body.interval]['time'] = new Date();
                    if(req.body.humidity !== ''){
                        temperaturedata.temperatures['hourly'][req.body.hour][req.body.interval]['humid'] = req.body.humidity;
                        temperaturedata.temperatures['hourly'][req.body.hour][req.body.interval]['pressure'] = req.body.pressure;
                    }
                    var temperature = new Temp(temperaturedata);
                    temperature.save();
                    //res.send(temperaturedata);
                    res.json(Response.code(err, temperaturedata), Response.data(err, temperaturedata));
                }else{
                    console.log('document found');
                    temperaturedata = temps[0];
                    var tmpid = temperaturedata._id;
                    //delete temperaturedata._id;
                    var tmpdata = {}
                    tmpdata.temperatures = {};
                    tmpdata.temperatures = temperaturedata.temperatures;
                    tmpdata.temperatures['hourly'][req.body.hour][req.body.interval]['value'] = req.body.temperature;
                    tmpdata.temperatures['hourly'][req.body.hour][req.body.interval]['time'] = new Date();
                    if(req.body.humidity !== ''){
                        tmpdata.temperatures['hourly'][req.body.hour][req.body.interval]['humid'] = req.body.humidity;
                        tmpdata.temperatures['hourly'][req.body.hour][req.body.interval]['pressure'] = req.body.pressure;
                    }
                    tmpdata.metadata = {};
                    tmpdata.metadata = temperaturedata.metadata;
                    tmpdata.metadata.last_updated = new Date();
                    Temp.update({ '_id': tmpid }, { '$set': tmpdata }, function(error, doc){
                        console.log('updated: ' + temperaturedata._id + ' status: ' + doc);
                        console.log('error: ' + error);
                    });
                    console.log(req.body);
                    res.send(tmpdata);
                }
            }else{
                res.send('0');
            }
        });
    },

    /* -------- gets -------- */
    deviceMostRecent: function( req, res ){
        var deviceid = decodeURIComponent( req.params.id ),
            start = new Date();

        start.setHours(0,0,0,0);
        console.log(start);

        Temp.find( { "device.id": deviceid, "metadata.date": { $gt: start } } ).exec( function( err, temps ){
            res.json( Response.code( err, temps ), Response.data( err, temps ) );
        });
    },
    deviceHistory: function( req, res ){
        var deviceid = decodeURIComponent( req.params.id );
        Temp.find( { "device.id": deviceid } ).exec( function( err, temps ){
            res.json( Response.code( err, temps ), Response.data( err, temps ) );
        });
    },
    deviceStatus: function( req, res ){
        //return last update from device. determine if in acceptable response time
    },

    /* -------- deletes -------- */
    deleteByTempId: function( req, res ){
        var tempid = req.body.id;
        Temp.findOneAndRemove( { _id: tempid }, function( err, temp ){
            res.json( Response.code( err, temp ), Response.data( err, temp ) );
        });
    }
};
