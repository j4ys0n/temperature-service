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
        hourly: {
            "00": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "01": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "02": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "03": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "04": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "05": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "06": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "07": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "08": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "09": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "10": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "11": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "12": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "13": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "14": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "15": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "16": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "17": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "18": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "19": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "20": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "21": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "22": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            },
            "23": {
                "0": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "1": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "2": { value: { type: Number, default: 0 }, time: { type: String, default: '' } },
                "3": { value: { type: Number, default: 0 }, time: { type: String, default: '' } }
            }
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
