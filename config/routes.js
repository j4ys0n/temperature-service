
// controllers

var devices = require( __dirname + '/../controllers/devices' );
var users = require( __dirname + '/../controllers/users' );
var accounts = require( __dirname + '/../controllers/accounts' );
var locations = require( __dirname + '/../controllers/locations' );
var temperature = require( __dirname + '/../controllers/temperature' );
var site = require( __dirname + '/../controllers/site' );

//routes

module.exports = function(app) {
  //front-end application
  //app.get( '/', site.default );

  //production routes
  app.get( '/login', site.login );


  //for dev
  //accounts
  app.get( '/accounts', accounts.renderAccountPage );
  app.get( '/accounts/new', accounts.renderAccountAdd );
  app.get( '/accounts/view/:id', accounts.renderAccountDetails );
  //locations
  app.get( '/locations', locations.renderLocationsPage );
  app.get( '/locations/new', locations.renderLocationAdd );
  app.get( '/locations/view/:id', locations.renderLocationDetails );
  //devices
  app.get( '/devices', devices.renderDevicesPage );
  app.get( '/devices/new', devices.renderDeviceAdd );
  app.get( '/devices/view/:id', devices.renderDeviceDetails );
  //users
  app.get( '/users', users.renderUsersPage );
  app.get( '/users/new', users.renderUserAdd );
  app.get( '/users/view/:id', users.renderUserDetails );

  //api
  //app.post( '/api/:account/:post', site.post );
  //app.get( '/api/:account/:status', site.status );

  //api devices
  app.post( '/api/device/new', devices.addDevice );
  app.get( '/api/device/id/:id', devices.getDeviceById );
  app.get( '/api/device/all', devices.getAllDevices );
  app.post( '/api/device/update/name', devices.updateDeviceName );
  app.post( '/api/device/update/battery', devices.updateDeviceBattery );
  app.post( '/api/device/update/uname', devices.updateDeviceUName );
  app.post( '/api/device/update/version', devices.updateDeviceVersion );
  app.post( '/api/device/update/nameversion', devices.updateDeviceNameVersion );
  app.delete( '/api/device/delete/id', devices.deleteDeviceById );

  //api users
  app.post( '/api/users/new', users.addUser );
  app.post( '/api/users/login', users.getUserByUsernameAndPass );
  app.get( '/api/users/id/:id', users.getUserById );
  app.get( '/api/users/username/:username', users.getUserByUsername );
  app.get( '/api/users/account/:accountid', users.getUsersByAccount );
  app.get( '/api/users/location/:locationid', users.getUsersByLocation );
  app.get( '/api/users/all', users.getAllUsers );
  app.post( '/api/users/update/account', users.updateUserAccount );
  app.delete( '/api/users/delete/id', users.deleteById );

  //api accounts
  app.post( '/api/account/new', accounts.addAccount );
  app.get( '/api/account/id/:id', accounts.getAccountById );
  app.get( '/api/account/all', accounts.getAllAccounts );
  app.post( '/api/account/update/primaryuser', accounts.updatePrimaryUser );
  app.post( '/api/account/update/name', accounts.updateName );
  app.post( '/api/account/update/adduser', accounts.addUser );
  app.post( '/api/account/update/removeuser', accounts.removeUser );
  app.post( '/api/account/update/addlocation', accounts.addLocation );
  app.post( '/api/account/update/removelocation', accounts.removeLocation );
  app.delete( '/api/account/delete/id', accounts.deleteById );

  //api locations
  app.post( '/api/locations/new', locations.addLocation );
  app.get( '/api/locations/id/:id', locations.getLocationById );
  app.get( '/api/locations/all', locations.getAllLocations );
  app.get( '/api/locations/account/:id', locations.getLocationsByAccount );
  //app.get( '/api/location/radius/:lat/:long/:miles', locations.getLocationsRadiusFromCoords );
  app.post( '/api/locations/update/primaryuser', locations.updatePrimaryUser );
  app.post( '/api/locations/update/account', locations.updateAccount );
  app.post( '/api/locations/update/name', locations.updateName );
  app.post( '/api/locations/update/wifi', locations.updateWifiInfo );
  app.post( '/api/locations/update/nameandaddress', locations.updateNameAndAddress );
  app.post( '/api/locations/update/address', locations.updateAddress );
  app.post( '/api/locations/update/adddevice', locations.addDevice );
  app.post( '/api/locations/update/removedevice', locations.removeDevice );
  app.post( '/api/locations/update/adduser', locations.addUser );
  app.post( '/api/locations/update/removeuser', locations.removeUser );
  app.delete( '/api/locations/delete/id', locations.deleteLocationById );

  //api temperatures
  app.post( '/api/temperature/new', temperature.post  );
  app.get( '/api/temperature/device/:id', temperature.deviceMostRecent );
  app.get( '/api/temperature/device/all/:id', temperature.deviceHistory );
  app.delete( '/api/temperature/tempid', temperature.deleteByTempId );

};
