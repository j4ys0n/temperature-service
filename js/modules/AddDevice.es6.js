class AddDevice {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			addDeviceURL: '/api/device/new',
			defaults: {
				battery: 100
			}
		};

		let selectors = {
			submitButton: '.add-device',
			inputDeviceName: 'input#name',
			inputDeviceVersion: 'input#version'
		};

		let objects = {
			submitButton: $(selectors.submitButton),
			inputDeviceName: $(selectors.inputDeviceName),
			inputDeviceVersion: $(selectors.inputDeviceVersion)
		};

		let responseHandler = function(res) {
			console.log(res);
		}

		let addDevice = function(e) {
			var deviceName = objects.inputDeviceName.val(),
				deviceVersion = objects.inputDeviceVersion.val(),
				data = {
					name: deviceName,
					version: deviceVersion,
					battery: constants.defaults.battery
				};

			utils.loadUrl(constants.addDeviceURL, 'post', JSON.stringify(data), true, responseHandler);
		};

		let keyHandler = function(e) {
			console.log(e.which);
		};

		let addEventListeners = function() {
			objects.submitButton.on('click', addDevice);
			objects.inputDeviceName.on('keydown', keyHandler);
			objects.inputDeviceVersion.on('keydown', keyHandler);
		};

		this.firstRun = function() {
			addEventListeners();
		};
	}

	name() {
		return "AddDevice";
	}

	init() {
		this.firstRun();
	}
}
export default AddDevice;
