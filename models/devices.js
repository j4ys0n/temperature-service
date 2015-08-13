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
var DeviceSchema = new Schema({
	battery: { type: Number, default: 100 },
	name: { type: String, default: '' },
	uname: {type: String, default: '' },
    version: { type: Number, default: 0 },
	metadata: {
		created: { type: String, default: Date() },
		last_updated: { type: String, default: '' }
	}
});

//turn off autoindexing. helps with performance in production
DeviceSchema.set( 'autoIndex', false );

//allow getters to be run on all documents when converting to Objects & JSON
DeviceSchema.set( 'toObject', { getters: true, virtuals: false } );
DeviceSchema.set( 'toJSON', { getters: true, virtuals: false } );

//model instance methods
DeviceSchema.methods = {

};

//model static methods
DeviceSchema.statics = {

}

mongoose.model( 'Device', DeviceSchema );
