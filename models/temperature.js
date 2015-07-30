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
        date: { type: String, default: Date.now },
        last_updated: { type: String, default: Date.now }
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
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "01": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "02": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "03": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "04": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "05": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "06": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "07": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "08": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "09": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "10": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "11": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "12": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "13": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "14": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "15": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "16": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "17": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "18": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "19": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "20": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "21": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "22": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
            },
            "23": {
                "00": { type: Number, default: 0 },
                "15": { type: Number, default: 0 },
                "30": { type: Number, default: 0 },
                "45": { type: Number, default: 0 }
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
