import DocDetails from './DocDetails.es6';

class DeviceDetails extends DocDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			getDeviceURL: '/api/device/id/',
			getTempsURL: '/api/temperature/device/',
			deleteUrl: '/api/device/delete/id',
			updateUrl: '/api/device/update/nameversion'
		};

		let selectors = {
			wrapper: '.device-details',
			deleteBtn: '.delete-device',
			enableDelete: '#enable-delete',
			//inputs
			inputs: 'input[type="text"]',
			submit: 'button.update-device'
		};

		let objects = {
			wrapper: $(selectors.wrapper)
		};

		let id = objects.wrapper.data('id');

		let forms = {
			id: id,
			delete: {
				deleteBtn: $(selectors.deleteBtn),
				enable: $(selectors.enableDelete)
			},
			inputs: $(selectors.inputs),
			submit: $(selectors.submit)
		};



		let deviceRequestHandler = function( res ){
			var device = JSON.parse(res).data;
			utils.debugConsole(device);
		};

		super($, Utils, forms, {delete: constants.deleteUrl,
								update: constants.updateUrl });

		this.firstRun = function() {
			//utils.loadUrl( constants.getDeviceURL+id, 'GET', null, false, deviceRequestHandler );
		};
	}

	name(){
		return "DeviceDetails";
	}

	init(){
		this.firstRun();
	}
}
export default DeviceDetails;
