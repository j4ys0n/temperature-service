var mongoose = require( 'mongoose' );
var User = mongoose.model( 'User' );
var Response = require( __dirname + '/../lib/Response' );
var Dispatcher = require( __dirname + '/../lib/Dispatcher' );

module.exports = {
    addUser: function( req, res ){
        //add auth check
        var userdata = {
                user_name: req.body.username,
                first_name: req.body.firstname,
                last_name: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                notification_scheme: req.body.notifications,
                password: req.body.password,
                account_id: req.body.accountid
            };
        var user = new User(userdata);
        user.save();
        res.send(userdata);
    },
    getUserById: function( req, res ){
        var id = decodeURIComponent( req.params.id );
        User.find( { _id: id } ).exec( function( err, user ){
            res.json( Response.code( err, user ), Response.data( err, user ) );
        });
    },
    getUserByUsername: function( req, res ){
        var username = decodeURIComponent( req.params.username );
        User.find( { user_name: username } ).exec( function( err, user ){
            res.json( Response.code( err, user ), Response.data( err, user ) );
        });
    },
    getAllUsers: function( req, res ){
        User.find( function( err, users ){
            res.json( Response.code( err, users ), Response.data( err, users ) );
        });
    }
};
