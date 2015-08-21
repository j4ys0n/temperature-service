import DocDetails from './DocDetails.es6';

class UserDetails extends DocDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			deleteUrl: '/api/users/delete/id'
		};

		let selectors = {
			wrapper: '.user-details',
			deleteBtn: '.delete-user',
			enableDelete: '#enable-delete'
		};

		let objects = {
			wrapper: $(selectors.wrapper)
		};

		let form = {
			delete: selectors.deleteBtn,
			id: objects.wrapper.data('id'),
			enable: $(selectors.enableDelete)
		};

		super($, Utils, form, {delete: constants.deleteUrl} );

		this.firstRun = function() {};
	}

	name() {
		return "UserDetails";
	}

	init() {
		this.firstRun();
	}
}

export default UserDetails;
