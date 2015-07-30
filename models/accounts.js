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
var AccountSchema = new Schema({
	primary_user: { type: String, default: '' },
	name: { type: String, default: '' },
	locations: { type: Array, default: [] },
	users: { type: Array, default: [] },
	metadata: {
		created: { type: String, default: Date.now },
		last_updated: { type: String, default: '' }
	}
});

//turn off autoindexing. helps with performance in production
AccountSchema.set( 'autoIndex', false );

//allow getters to be run on all documents when converting to Objects & JSON
AccountSchema.set( 'toObject', { getters: true, virtuals: false } );
AccountSchema.set( 'toJSON', { getters: true, virtuals: false } );

//model instance methods
AccountSchema.methods = {

};

//model static methods
AccountSchema.statics = {

}

mongoose.model( 'Account', AccountSchema );
