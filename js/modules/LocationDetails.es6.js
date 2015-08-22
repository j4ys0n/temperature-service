import DocDetails from './DocDetails.es6';

class LocationDetails extends DocDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			getDeviceURL: '/api/device/id/',
			viewDeviceURL: '/devices/view/',
			removeDeviceURL: '/api/locations/update/removedevice',
			getUserURL: '/api/users/id/',
			viewUserURL: '/users/view/',
			removeUserURL: '/api/locations/update/removeuser',
			deleteUrl: '/api/locations/delete/id'
		};

		let selectors = {
			wrapper: '.location-details',
			primaryUser: '#primary-user',
			usersList: '#users-list',
			devicesList: '#devices-list',
			deleteBtn: '.delete-location',
			enableDelete: '#enable-delete',
			//linked doc selects
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
			//device
			addDevice: '#add-device',
			addDeviceForm: '#add-form-device',
			addDeviceSelect: '#device-select',
			addDeviceSubmit: '#device-select-submit'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			primaryUser: $(selectors.primaryUser),
			usersList: $(selectors.usersList),
			devicesList: $(selectors.devicesList)
		};

		let id = objects.wrapper.data('id');

		let forms = {
			id: id,
			delete: {
				deleteBtn: $(selectors.deleteBtn),
				enable: $(selectors.enableDelete)
			},
			link: {
				user: {
					docsUrl: '/api/users/all',
					submitUrl: '/api/locations/update/adduser',
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
					submitUrl: '/api/locations/update/primaryuser' ,
					add: $(selectors.addPrimary),
					form: $(selectors.addPrimaryForm),
					select: $(selectors.addPrimarySelect),
					selectDisplayField: 'user_name',
					submit: $(selectors.addPrimarySubmit),
					existing: objects.primaryUser.data('ids'),
					updateField: 'userid'
				},
				deivce: {
					docsUrl: '/api/device/all',
					submitUrl: '/api/locations/update/adddevice',
					add: $(selectors.addDevice),
					form: $(selectors.addDeviceForm),
					select: $(selectors.addDeviceSelect),
					selectDisplayField: 'name',
					submit: $(selectors.addDeviceSubmit),
					existing: objects.devicesList.data('ids'),
					updateField: 'deviceid'
				}
			}
		};

		super($, Utils, forms, {delete: constants.deleteUrl});

		let self = this;

		self.firstRun = function() {
			var primaryUrls = {
				get: constants.getUserURL,
				view: constants.viewUserURL,
				remove: null,
				removeIdField: null
			};
			self.addRelatedByIds(objects.primaryUser.data('ids'), primaryUrls, 'user_name', objects.primaryUser);
			var userUrls = {
				get: constants.getUserURL,
				view: constants.viewUserURL,
				remove: constants.removeUserURL,
				removeIdField: 'userid'
			};
			self.addRelatedByIds(objects.usersList.data('ids'), userUrls, 'user_name', objects.usersList);
			var deviceUrls = {
				get: constants.getDeviceURL,
				view: constants.viewDeviceURL,
				remove: constants.removeDeviceURL,
				removeIdField: 'deviceid'
			};
			self.addRelatedByIds(objects.devicesList.data('ids'), deviceUrls, 'name', objects.devicesList);
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
