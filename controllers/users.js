var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    /**
        -------- views --------
    **/

    renderUsersPage: function( req, res ){
        User.find().exec( function( err, users ){
            res.render( 'index', { data: { page: 'users', users: users } } );
        });
    },
    renderUserDetails: function( req, res ){
        var id = decodeURIComponent( req.params.id );
        User.findOne( { _id: id } ).exec( function( err, user ){
            res.render( 'index', { data: { page: 'user-detail', user: user } } );
        });
    },
    renderUserAdd: function( req, res ){
        res.render( 'index', { data: { page: 'user-new' } } );
    },

    /**
        -------- API --------
    **/

    /* -------- inserts -------- */
    addUser: function( req, res ){
        //add auth check
        var userdata = {
                user_name: req.body.user_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                phone: req.body.phone,
                notification_scheme: req.body.notification_scheme,
                password: req.body.password,
                //account_id: req.body.accountid
            };
        var user = new User(userdata);
        user.save();
        res.send(userdata);
    },

    /* -------- gets -------- */
    getUserById: function( req, res ){
        var id = decodeURIComponent( req.params.id );
        User.find( { _id: id } ).exec( function( err, user ){
            res.json( Response.code( err, user ), Response.data( err, user ) );
        });
    },
    getUserByUsername: function( req, res ){
        var username = req.body.username;
        User.find( { user_name: username } ).exec( function( err, user ){
            res.json( Response.code( err, user ), Response.data( err, user ) );
        });
    },
    getUsersByAccount: function (req, res ){
        var accountid = decodeURIComponent( req.params.accountid );
        User.find( { account_id: accountid } ).exec( function( err, users ){
            res.json( Response.code( err, users ), Response.data( err, users ) );
        });
    },
    getUsersByLocation: function (req, res ){
        var locationid = decodeURIComponent( req.params.locationid );
        User.find( { location_id: locationid } ).exec( function( err, users ){
            res.json( Response.code( err, users ), Response.data( err, users ) );
        });
    },
    getAllUsers: function( req, res ){
        User.find( function( err, users ){
            res.json( Response.code( err, users ), Response.data( err, users ) );
        });
    },
    //login
    // getUserByUsername: function( req, res ) {
    //     var username = req.body.username;
    //     User.find( { user_name: username} ).exec( function( err, user ){
    //         console.log(username);
    //         res.json( Response.code( err, user ), Response.data( err, user ) );
    //     });
    // },

    /* -------- updates -------- */
    updateUserAccount: function( req, res ){
        User.update( { _id: req.body.id }, { '$set': { 'account_id': req.body.accountid, 'metadata.last_updated': new Date() } }, function(error, status){
            console.log('account updated: ' + req.body.id + ' status: ' + status);
            if(status === 1){
                res.send('updated');
            }else{
                res.send('error:'+ error);
            }
        });
    },

    /* -------- deletes -------- */
    deleteById: function( req, res ){
        User.findOneAndRemove( { _id: req.body.id }, function( err, user ){
            res.json( Response.code( err, user ), Response.data( err, user ) );
        });
    }
};
