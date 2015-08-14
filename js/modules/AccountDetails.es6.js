class AccountDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			getLocationsURL: '/api/locations/account/',
			viewLocationURL: '/locations/view/',
			getUsersURL: '/api/users/account/',
			viewUserURL: '/users/view/'
		};

		let selectors = {
			wrapper: '.account-details',
			locationsList: '#locations-list',
			usersList: '#users-list'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			locationsList: $(selectors.locationsList),
			usersList: $(selectors.usersList)
		};

		let accountID = '';

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

		this.firstRun = function() {
			accountID = objects.wrapper.data('id');
			utils.loadUrl( constants.getLocationsURL+accountID, 'GET', null, false, locationsRequestHandler);
			utils.loadUrl( constants.getUsersURL+accountID, 'GET', null, false, usersRequestHandler);
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
