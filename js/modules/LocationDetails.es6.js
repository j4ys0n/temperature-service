class LocationDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			getDeviceURL: '/api/device/id/',
			viewDeviceURL: '/devices/view/',
			getUsersURL: '/api/users/id/',
			viewUserURL: '/users/view/',
			deleteUrl: '/api/locations/delete/id'
		};

		let selectors = {
			wrapper: '.location-details',
			usersList: '#users-list',
			devicesList: '#devices-list',
			deleteBtn: '.delete-location'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			usersList: $(selectors.usersList),
			devicesList: $(selectors.devicesList),
			deleteBtn: $(selectors.deleteBtn)
		};

		let id = '',
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

		let deleteResponseHandler = function (res) {
			utils.debugConsole(res);
		};

		let deleteBtnHandler = function(e) {
			utils.debugConsole('delete');
			utils.loadUrl( constants.deleteUrl, 'DELETE', JSON.stringify({id: id}), true, deleteResponseHandler );
		};

		let addEventListeners = function(e) {
			objects.deleteBtn.on('click', deleteBtnHandler);
		};

		this.firstRun = function() {
			id = objects.wrapper.data('id');
			userIDs = objects.usersList.data('ids').split(',');
			deviceIDs = objects.devicesList.data('ids').split(',');

			addEventListeners();

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
