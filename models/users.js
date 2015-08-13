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
var UserSchema = new Schema({
    user_name: { type: String, default: '' },
	first_name: { type: String, default: '' },
	last_name: { type: String, default: '' },
	email: { type: String, default: '' },
	phone: { type: String, default: '' },
	notification_scheme: { type: Array, default: ['phone'] },
	password: { type: String, default: '' },
	account_id: { type: String, default: '' },
	metadata: {
		created: { type: String, default: Date.now },
		last_updated: { type: String, default: Date.now }
	}
});

//turn off autoindexing. helps with performance in production
UserSchema.set( 'autoIndex', false );

//allow getters to be run on all documents when converting to Objects & JSON
UserSchema.set( 'toObject', { getters: true, virtuals: false } );
UserSchema.set( 'toJSON', { getters: true, virtuals: false } );

//model instance methods
UserSchema.methods = {

};

//model static methods
UserSchema.statics = {

}

mongoose.model( 'User', UserSchema );
