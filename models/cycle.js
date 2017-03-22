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
var CycleSchema = new Schema({
	growth_stage: { type: String, default: '' },
	water_method: { type: String, default: '' },
	water_duration: { type: Number, default: 0 },
	light_duration: { type: Number, default: 0 },
	cycle_duration: { type: Number, default: 0 },
	temperature: { type: Number, default: 0 },
	humidity: { type: Number, default: 0 }
});

//turn off autoindexing. helps with performance in production
CycleSchema.set( 'autoIndex', false );

//allow getters to be run on all documents when converting to Objects & JSON
CycleSchema.set( 'toObject', { getters: true, virtuals: false } );
CycleSchema.set( 'toJSON', { getters: true, virtuals: false } );

//model instance methods
CycleSchema.methods = {

};

//model static methods
CycleSchema.statics = {

}

mongoose.model( 'Cycle', CycleSchema );
