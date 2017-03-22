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
var WaterSchema = new Schema({
	method: { type: String, default: '' },
	basin_capacity: { type: Number, default: 0 },
	res_capacity: { type: Number, default: 0 },
	pump_volume: { type: Number, default: 0 }
});

//turn off autoindexing. helps with performance in production
WaterSchema.set( 'autoIndex', false );

//allow getters to be run on all documents when converting to Objects & JSON
WaterSchema.set( 'toObject', { getters: true, virtuals: false } );
WaterSchema.set( 'toJSON', { getters: true, virtuals: false } );

//model instance methods
WaterSchema.methods = {

};

//model static methods
WaterSchema.statics = {

}

mongoose.model( 'Water', WaterSchema );
