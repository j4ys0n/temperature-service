
// controllers

var devices = require( __dirname + '/../controllers/devices' );
var users = require( __dirname + '/../controllers/users' );
var accounts = require( __dirname + '/../controllers/accounts' );
var locations = require( __dirname + '/../controllers/locations' );
var temperature = require( __dirname + '/../controllers/temperature' );

//routes

module.exports = function(app) {
  //front-end application
  //app.get( '/', site.default );

  //api
  //app.post( '/api/:account/:post', site.post );
  //app.get( '/api/:account/:status', site.status );

  //api devices
  app.post( '/api/device/new', devices.addDevice );
  app.get( '/api/device/id/:id', devices.getDeviceById );
  app.get( '/api/device/all', devices.getAllDevices );

  //api users
  app.post( '/api/users/new', users.addUser );
  app.get( '/api/users/id/:id', users.getUserById );
  app.get( '/api/users/username/:username', users.getUserByUsername );
  app.get( '/api/users/all', users.getAllUsers );
  app.delete( '/api/users/delete/id', users.deleteById );

  //api accounts
  app.post( '/api/account/new', accounts.addAccount );
  app.get( '/api/account/id/:id', accounts.getAccountById );
  app.get( '/api/account/all', accounts.getAllAccounts );
  app.post( '/api/account/update/primaryuser', accounts.updatePrimaryUser );
  app.delete( '/api/account/delete/id', accounts.deleteById );

  //api locations
  app.post( '/api/locations/new', locations.addLocation );
  app.get( '/api/locations/id/:id', locations.getLocationById );
  app.get( '/api/locations/all', locations.getAllLocations );
  //app.get( '/api/location/account/:id', locations.getLocationsByAccount );
  //app.get( '/api/location/radius/:lat/:long/:miles', locations.getLocationsRadiusFromCoords );
  app.post( '/api/locations/update/primaryuser', locations.updatePrimaryUser );
  app.post( '/api/locations/update/account', locations.updateAccount );
  app.delete( '/api/locations/delete/id', locations.deleteLocationById );

  //api temperatures
  app.post( '/api/temperature/new', temperature.post  );
  app.get( '/api/temperature/device/:id', temperature.deviceHistory );
  app.delete( '/api/temperature/tempid', temperature.deleteByTempId );

};
