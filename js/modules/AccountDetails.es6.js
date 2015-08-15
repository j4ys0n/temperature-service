class AccountDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			getLocationsURL: '/api/locations/account/',
			viewLocationURL: '/locations/view/',
			getUsersURL: '/api/users/account/',
			viewUserURL: '/users/view/',
			deleteUrl: '/api/account/delete/id'
		};

		let selectors = {
			wrapper: '.account-details',
			locationsList: '#locations-list',
			usersList: '#users-list',
			deleteBtn: '.delete-account'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			locationsList: $(selectors.locationsList),
			usersList: $(selectors.usersList),
			deleteBtn: $(selectors.deleteBtn)
		};

		let id = '';

		let addLink = function( text, url, $target ) {
			var $link = $(document.createElement('a'));
			$link.text(text);
			$link.attr('href', url);
			$target.append($link);
		};

		let locationsRequestHandler = function( res ) {
			var locations = JSON.parse(res).data,
				i = 0;

			for (i; i < locations.length; i++){
				addLink(locations[i].name, constants.viewLocationURL+locations[i]._id, objects.locationsList);
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

			addEventListeners();

			utils.loadUrl( constants.getLocationsURL+id, 'GET', null, false, locationsRequestHandler);
			utils.loadUrl( constants.getUsersURL+id, 'GET', null, false, usersRequestHandler);
		};
	}

	name(){
		return "AccountDetails";
	}

	init(){
		this.firstRun();
	}
}
export default AccountDetails;
