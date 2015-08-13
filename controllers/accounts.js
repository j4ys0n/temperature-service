var mongoose = require( 'mongoose' );
var Account = mongoose.model( 'Account' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    /* -------- inserts -------- */
    addAccount: function( req, res ){
        //add auth check
        var accountdata = {
                name: req.body.name
            };
        var account = new Account(accountdata);
        account.save();
        res.send(accountdata);
    },

    /* -------- gets -------- */
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
    },

    /* -------- updates -------- */
    updatePrimaryUser: function( req, res ){
        Account.update( { _id: req.body.accountid }, { '$set': { 'primary_user': req.body.userid, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('account updated: ' + req.body.accountid + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },

    /* -------- deletes -------- */
    deleteById: function( req, res ){
        Account.findOneAndRemove( { _id: req.body.id }, function( err, user ){
            res.json( Response.code( err, user ), Response.data( err, user ) );
        });
    }
};
