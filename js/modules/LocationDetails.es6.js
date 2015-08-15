class LocationDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			getDeviceURL: '/api/device/id/',
			viewDeviceURL: '/devices/view/',
			getUsersURL: '/api/users/id/',
			viewUserURL: '/users/view/'
		};

		let selectors = {
			wrapper: '.location-details',
			usersList: '#users-list',
			devicesList: '#devices-list'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			usersList: $(selectors.usersList),
			devicesList: $(selectors.devicesList)
		};

		let locationID = '',
			userIDs = [],
			deviceIDs = [];

		let addLink = function( text, url, $target ) {
			var $link = $(document.createElement('a'));
			$link.text(text);
			$link.attr('href', url);
			$target.append($link);
		};

		let devicesRequestHandler = function( res ) {
			var devices = JSON.parse(res).data,
				i = 0;

			for (i; i < devices.length; i++){
				addLink(devices[i].name, constants.viewDeviceURL+devices[i]._id, objects.devicesList);
			}
		};

		let usersRequestHandler = function( res ) {
			var users = JSON.parse(res).data,
				i = 0;
				
			for (i; i < users.length; i++){
				addLink(users[i].user_name, constants.viewUserURL+users[i]._id, objects.usersList);
			}
		};

		this.firstRun = function() {
			locationID = objects.wrapper.data('id');
			userIDs = objects.usersList.data('ids').split(',');
			deviceIDs = objects.devicesList.data('ids').split(',');

			for (var i = 0; i < deviceIDs.length; i++ ){
				utils.loadUrl( constants.getDeviceURL+deviceIDs[i], 'GET', null, false, devicesRequestHandler);
			}
			for (var i = 0; i < userIDs.length; i++ ){
				utils.loadUrl( constants.getUsersURL+userIDs[i], 'GET', null, false, usersRequestHandler);
			}


		};
	}

	name(){
		return "LocationDetails";
	}

	init(){
		this.firstRun();
	}
}
export default LocationDetails;
