var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;
var urlify = require( 'urlify' ).create({
    spaces: '-',
    toLower: true,
    nonPritable: '-',
    trim: true
});

/**
 * Site model Schema
 * @type {Schema}
 */
var TemperatureSchema = new Schema({
    metadata: {
        date: { type: String, default: Date() },
        last_updated: { type: String, default: Date() }
    },
    device: {
        id: { type: String, default: '' },
        battery: { type: String, default: '' }
    },
    account: {
        id: { type: String, default: '' }
    },
    temperatures: {
        average: { type: Number, default: 0 },
        high: { type: Number, default: 0 },
        low: { type: Number, default: 0 },
		readings: { type: Array, default: 
			[{
				temp: { type: Number, default: 0 },
				humid: { type: Number, default: 0 },
				vis: { type: Number, default: 0 },
				ir: { type: Number, default: 0 },
				time: { type: String, default: '' }
			}]
		}
    }
});

//turn off autoindexing. helps with performance in production
TemperatureSchema.set( 'autoIndex', false );

//allow getters to be run on all documents when converting to Objects & JSON
TemperatureSchema.set( 'toObject', { getters: true, virtuals: false } );
TemperatureSchema.set( 'toJSON', { getters: true, virtuals: false } );

//model instance methods
TemperatureSchema.methods = {

};

//model static methods
TemperatureSchema.statics = {

}

mongoose.model( 'Temperature', TemperatureSchema );
