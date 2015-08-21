var mongoose = require( 'mongoose' );
var Account = mongoose.model( 'Account' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    /**
        -------- views --------
    **/

    renderAccountPage: function( req, res ){
        Account.find().exec( function( err, accounts ){
            res.render( 'index', { data: { page: 'accounts', accounts: accounts } } );
        });
    },
    renderAccountDetails: function( req, res ){
        var id = decodeURIComponent( req.params.id );
        Account.findOne( { _id: id } ).exec( function( err, account ){
            res.render( 'index', { data: { page: 'account-detail', account: account } } );
        });
    },
    renderAccountAdd: function( req, res ){
        res.render( 'index', { data: { page: 'account-new' } } );
    },

    /**
        -------- API --------
    **/

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
    addUser: function( req, res ){
        Account.findOne( { _id: req.body.accountid } ).exec( function( err, account ){
            var users = account.users || [],
                userid = req.body.userid,
                added = false;
            if(users.indexOf(userid) === -1 && userid !== null){
                users.push(userid);
                added = true;
            }
            if(added){
                Account.update( { _id: req.body.accountid }, { '$set': { 'users': users, 'metadata.last_updated': new Date() } }, function(error, status){
                    console.log('location update: ' + req.body.locationid + ' status: ' + status);
                    if(status === 1){
                        res.send('updated');
                    }else{
                        res.send('error:'+ error);
                    }
                });
            }else{
                res.send('user already connected to account');
            }
		});
    },
    removeUser: function( req, res ){

    },
    addLocation: function( req, res ){
        Account.findOne( { _id: req.body.accountid } ).exec( function( err, account ){
            var locations = account.locations || [],
                locationid = req.body.locationid,
                added = false;
            if(locations.indexOf(locationid) === -1 && locationid !== null){
                locations.push(locationid);
                added = true;
            }
            if(added){
                Account.update( { _id: req.body.accountid }, { '$set': { 'locations': locations, 'metadata.last_updated': new Date() } }, function(error, status){
                    console.log('location update: ' + req.body.locationid + ' status: ' + status);
                    if(status === 1){
                        res.send('updated');
                    }else{
                        res.send('error:'+ error);
                    }
                });
            }else{
                res.send('location already connected to account');
            }
		});
    },
    removeLocation: function( req, res ){
        Account.findOne( { _id: req.body.accountid } ).exec( function( err, account ) {
            var locations = account.locations,
                locationid = req.body.locationid,
                idIndex = locations.indexOf(locationid);
            if(idIndex > -1){
                locations.splice(idIndex, 1);
                Account.update( { _id: req.body.accountid }, { '$set': { 'locations': locations, 'metadata.last_updated': new Date() } }, function(error, status){
                    console.log('location update: ' + req.body.locationid + ' status: ' + status);
                    if(status === 1){
                        res.send('updated');
                    }else{
                        res.send('error:'+ error);
                    }
                });
            }else{
                res.send('location not connected to account');
            }
        });
    },
    updateName: function( req, res ){
        Account.update( { _id: req.body.accountid }, { '$set': { 'name': req.body.name, 'metadata.last_updated': new Date() } }, function(error, status){
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
