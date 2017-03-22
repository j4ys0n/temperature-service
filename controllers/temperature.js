var mongoose = require( 'mongoose' );
var Temp = mongoose.model( 'Temperature' );
var Response = require( __dirname + '/../lib/Response' );

module.exports = {
    default: function( req, res ){
        res.render( 'admin', { data: { page: 'default' } } );
    },

    /* -------- inserts/updates -------- */
	post1: function( req, res ){
		console.log(req.body);
	},
    post: function( req, res ){
        var current = new Date(),
            start = new Date(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate(), current.getUTCHours(), current.getUTCMinutes(), current.getUTCSeconds() ),
            temperaturedata;
        start.setHours(0,0,0,0);
        console.log('*********** START **********');
        console.log('device date: '+current);
        console.log(req.body);
        console.log('*********** END **********');
        Temp.find( { "device.id": req.body.device_id, "metadata.date": { $gt: start } } ).exec( function( err, temps ){
            var //hour = req.body.hour,
                //interval = req.body.interval,
                temperature = req.body.temperature,
                average;

            if(temps != undefined) {
                if(temps.length === 0){
                    console.log('no documents today, create one');
                    temperaturedata = {
                        device: {
                            id: req.body.device_id,
                            //battery: req.body.device.battery
                        },
                        account: {
                            //id: req.body.account.id
                        },
                        metadata: {
                            date: current
                        }
                    };
                    temperaturedata.temperatures = {};
                    temperaturedata.temperatures['high'] = temperature;
                    temperaturedata.temperatures['low'] = temperature;
                    //temperaturedata.readings['average'] = temperature;
					temperaturedata.temperatures['readings'] = [];
					temperaturedata.temperatures['readings'].push({
						'temp': temperature,
						'humid': req.body.humidity,
						'vis': req.body.visible,
						'ir': req.body.ir,
						'time': new Date()
					});
                    //temperaturedata.temperatures['hourly'] = {};
                    //temperaturedata.temperatures['hourly'][hour] = {};
                    //temperaturedata.temperatures['hourly'][hour][interval] = {};
                    //temperaturedata.temperatures['hourly'][hour][interval]['value'] = temperature;
                    //temperaturedata.temperatures['hourly'][hour][interval]['time'] = new Date();
                    // if(req.body.humidity !== undefined){
                    //     temperaturedata.temperatures['hourly'][hour][interval]['humid'] = req.body.humidity;
                    //     temperaturedata.temperatures['hourly'][hour][interval]['pressure'] = req.body.pressure;
                    // }
                    var temperature = new Temp(temperaturedata);
                    temperature.save();
                    //res.send(temperaturedata);
                    res.json(Response.code(err, temperaturedata), Response.data(err, temperaturedata));
                }else{
                    console.log('document found, updating');
                    temperaturedata = temps[0];
                    var tmpid = temperaturedata._id;
                    //delete temperaturedata._id;
                    var tmpdata = {}
					//console.log(temperaturedata);
                    tmpdata.temperatures = {};
                    tmpdata.temperatures = temperaturedata.temperatures;
                    if(temperature > temperaturedata.temperatures.high){
                        tmpdata.temperatures.high = temperature;
                    }
                    if(temperature < temperaturedata.temperatures.low){
                        tmpdata.temperatures.low = temperature;
                    }
                    // average = temperaturedata.readings.average;
                    // var h = parseInt(hour,10),
                    //     i = parseInt(interval, 10);
                    //tmpdata.readings.average = ((h*4+i) * average + temperature)/(h*4+i+1);
                    // tmpdata.readings['hourly'][hour][interval]['value'] = temperature;
                    // tmpdata.readings['hourly'][hour][interval]['time'] = current;
                    // if(req.body.humidity !== undefined){
                    //     tmpdata.readings['hourly'][hour][interval]['humid'] = req.body.humidity;
                    //     tmpdata.readings['hourly'][hour][interval]['pressure'] = req.body.pressure;
                    // }
					tmpdata.temperatures.readings.push({
						'temp': temperature,
						'humid': req.body.humidity,
						'vis': req.body.visible,
						'ir': req.body.ir,
						'time': new Date()
					});
                    tmpdata.metadata = {};
                    tmpdata.metadata = temperaturedata.metadata;
                    tmpdata.metadata.last_updated = current;
                    Temp.update({ '_id': tmpid }, { '$set': tmpdata }, function(error, doc){
                        console.log('updated: ' + temperaturedata._id + ' status: ' + doc);
                        console.log('error: ' + error);
                    });
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
    deviceHistoryWeek: function( req, res ){
        var deviceid = decodeURIComponent( req.params.id ),
            start = new Date();

        start.setHours(0,0,0,0);
        start.setDate(start.getDate() - 7);
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
    },
    deleteAllByDeviceId: function( req, res ){
        //var id = req.body.id;
        // Temp.find( { "device.id": id } ).remove().exec( function( err, temps ){
        //     res.json(Response.code( err, temps ), Response.data( err, temps ) );
        // });
        Temp.remove({}, function(err) {
            res.send('collection removed');
            console.log('collection removed');
        });
    }
};
