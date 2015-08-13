var mongoose = require( 'mongoose' );
var Account = mongoose.model( 'Account' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    addAccount: function( req, res ){
        //add auth check
        var accountdata = {
                name: req.body.name
            };
        var account = new User(accountdata);
        account.save();
        res.send(accountdata);
    },
    getAccountById: function( req, res ){
        var id = decodeURIComponent( req.params.id );
        Account.find( { _id: id } ).exec( function( err, account ){
            res.json( Response.code( err, account ), Response.data( err, account ) );
        });
    },
    getAllAccounts: function( req, res ){
        Account.find( function( err, accounts ){
            res.json( Response.code( err, accounts ), Response.data( err, accounts ) );
        });
    }
};
