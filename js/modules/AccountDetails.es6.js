import DocDetails from './DocDetails.es6';

class AccountDetails extends DocDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			getLocationsURL: '/api/locations/id/',
			viewLocationURL: '/locations/view/',
			getUserURL: '/api/users/id/',
			viewUserURL: '/users/view/',
			deleteUrl: '/api/account/delete/id'
		};

		let selectors = {
			wrapper: '.account-details',
			locationsList: '#locations-list',
			primaryUser: '#primary-user',
			usersList: '#users-list',
			deleteBtn: '.delete-account',
			enableDelete: '#enable-delete'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			locationsList: $(selectors.locationsList),
			primaryUser: $(selectors.primaryUser),
			usersList: $(selectors.usersList)
		};

		let id = objects.wrapper.data('id');

		let deleteForm = {
			id: id,
			delete: $(selectors.deleteBtn),
			enable: $(selectors.enableDelete)
		};

		super($, Utils, deleteForm, {delete: constants.deleteUrl});

		let self = this;

		self.firstRun = function() {
			self.addRelatedByIds(objects.locationsList.data('ids'), constants.getLocationsURL, constants.viewLocationURL, 'name', objects.locationsList);
			self.addRelatedByIds(objects.primaryUser.data('ids'), constants.getUserURL, constants.viewUserURL, 'user_name', objects.primaryUser);
			self.addRelatedByIds(objects.usersList.data('ids'), constants.getUserURL, constants.viewUserURL, 'user_name', objects.usersList);
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
