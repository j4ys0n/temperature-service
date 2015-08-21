import DocDetails from './DocDetails.es6';

class LocationDetails extends DocDetails {
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
			primaryUser: '#primary-user',
			usersList: '#users-list',
			devicesList: '#devices-list',
			deleteBtn: '.delete-location',
			enableDelete: '#enable-delete'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			primaryUser: $(selectors.primaryUser),
			usersList: $(selectors.usersList),
			devicesList: $(selectors.devicesList)
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
			self.addRelatedByIds(objects.primaryUser.data('ids'), constants.getUsersURL, constants.viewUserURL, 'user_name', objects.primaryUser);
			self.addRelatedByIds(objects.usersList.data('ids'), constants.getUsersURL, constants.viewUserURL, 'user_name', objects.usersList);
			self.addRelatedByIds(objects.devicesList.data('ids'), constants.getDeviceURL, constants.viewDeviceURL, 'name', objects.devicesList);
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
