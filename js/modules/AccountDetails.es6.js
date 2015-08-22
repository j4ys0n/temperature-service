import DocDetails from './DocDetails.es6';

class AccountDetails extends DocDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			getLocationsURL: '/api/locations/id/',
			viewLocationURL: '/locations/view/',
			removeLocationURL: '/api/account/update/removelocation',
			getUserURL: '/api/users/id/',
			viewUserURL: '/users/view/',
			removeUserURL: '/api/account/update/removeuser',
			deleteUrl: '/api/account/delete/id',
			updateUrl: '/api/account/update/name'
		};

		let selectors = {
			wrapper: '.account-details',
			locationsList: '#locations-list',
			primaryUser: '#primary-user',
			usersList: '#users-list',
			//delete selects
			deleteBtn: '.delete-account',
			enableDelete: '#enable-delete',
			//linked doc selects
			//location
			addLocation: '#add-location',
			addLocationForm: '#add-form-location',
			addLocationSelect: '#location-select',
			addLocationSubmit: '#location-select-submit',
			//user
			addUser: '#add-user',
			addUserForm: '#add-form-user',
			addUserSelect: '#user-select',
			addUserSubmit: '#user-select-submit',
			//primary user
			addPrimary: '#add-primary',
			addPrimaryForm: '#add-form-primary',
			addPrimarySelect: '#primary-select',
			addPrimarySubmit: '#primary-select-submit',
			//inputs
			inputs: 'input[type="text"]',
			submit: 'button.update-account'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			locationsList: $(selectors.locationsList),
			primaryUser: $(selectors.primaryUser),
			usersList: $(selectors.usersList)
		};

		let id = objects.wrapper.data('id');

		let forms = {
			id: id,
			delete: {
				deleteBtn: $(selectors.deleteBtn),
				enable: $(selectors.enableDelete)
			},
			link: {
				account: {
					docsUrl: '/api/locations/all',
					submitUrl: '/api/account/update/addlocation',
					add: $(selectors.addLocation),
					form: $(selectors.addLocationForm),
					select: $(selectors.addLocationSelect),
					selectDisplayField: 'name',
					submit: $(selectors.addLocationSubmit),
					existing: objects.locationsList.data('ids'),
					updateField: 'locationid'
				},
				user: {
					docsUrl: '/api/users/all',
					submitUrl: '/api/account/update/adduser',
					add: $(selectors.addUser),
					form: $(selectors.addUserForm),
					select: $(selectors.addUserSelect),
					selectDisplayField: 'user_name',
					submit: $(selectors.addUserSubmit),
					existing: objects.usersList.data('ids'),
					updateField: 'userid'
				},
				primaryUser: {
					docsUrl: '/api/users/all',
					submitUrl: '/api/account/update/primaryuser' ,
					add: $(selectors.addPrimary),
					form: $(selectors.addPrimaryForm),
					select: $(selectors.addPrimarySelect),
					selectDisplayField: 'user_name',
					submit: $(selectors.addPrimarySubmit),
					existing: objects.primaryUser.data('ids'),
					updateField: 'userid'
				}
			},
			inputs: $(selectors.inputs),
			submit: $(selectors.submit)
		};

		super($, Utils, forms, {delete: constants.deleteUrl,
								update: constants.updateUrl});

		let self = this;

		self.firstRun = function() {
			var locationUrls = {
				get: constants.getLocationsURL,
				view: constants.viewLocationURL,
				remove: constants.removeLocationURL,
				removeIdField: 'locationid'
			};
			self.addRelatedByIds(objects.locationsList.data('ids'), locationUrls, 'name', objects.locationsList);
			var userUrls = {
				get: constants.getUserURL,
				view: constants.viewUserURL,
				remove: constants.removeUserURL,
				removeIdField: 'userid'
			};
			self.addRelatedByIds(objects.usersList.data('ids'), userUrls, 'user_name', objects.usersList);
			var primaryUrls = {
				get: constants.getUserURL,
				view: constants.viewUserURL,
				remove: null,
				removeIdField: null
			};
			self.addRelatedByIds(objects.primaryUser.data('ids'), primaryUrls, 'user_name', objects.primaryUser);
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
