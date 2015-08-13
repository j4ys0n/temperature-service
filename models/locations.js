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
var LocationSchema = new Schema({
	primary_user: { type: String, default: '' },
    account_id: { type: String, default: '' },
	name: { type: String, default: '' },
	billing: {
		balance: { type: Number, default: 0 },
		payments: { type: Array, default: [
			{
				amount: { type: Number, default: 0 },
				date: {type: String, default: '' }
			}
		]}
	},
	users: { type: Array, default: [] },
	devices: { type: Array, default: [] },
	metadata: {
		created: { type: String, default: Date() },
		last_updated: { type: String, default: '' }
	},
	address: {
		company: { type: String, default: '' },
		address1: { type: String, default: '' },
		address2: { type: String, default: '' },
		city: { type: String, default: '' },
		state: { type: String, default: '' },
		zip: { type: String, default: '' },
		coords: { type: Array, default: [], index: '2dsphere' }
	},
	wifi: {
		ssid: { type: String, default: '' },
		password: { type: String, default: '' }
	}
});

//turn off autoindexing. helps with performance in production
LocationSchema.set( 'autoIndex', true );

//allow getters to be run on all documents when converting to Objects & JSON
LocationSchema.set( 'toObject', { getters: true, virtuals: false } );
LocationSchema.set( 'toJSON', { getters: true, virtuals: false } );

//model instance methods
LocationSchema.methods = {

};

//model static methods
LocationSchema.statics = {

}

mongoose.model( 'Location', LocationSchema );
