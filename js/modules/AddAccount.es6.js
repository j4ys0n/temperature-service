class AddAccount {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			addURL: '/api/account/new'
		};

		let selectors = {
			submitButton: '.add-account',
			inputName: 'input#name',
			//inputLocations: 'input#version'
		};

		let objects = {
			submitButton: $(selectors.submitButton),
			inputName: $(selectors.inputName),
			//inputDeviceVersion: $(selectors.inputDeviceVersion)
		};

		let responseHandler = function(res) {
			utils.debugConsole(res);
			utils.debugConsole(res);
		}

		let addDevice = function(e) {
			var name = objects.inputName.val(),
				data = {
					name: name
				};

			utils.loadUrl(constants.addURL, 'post', JSON.stringify(data), true, responseHandler);
		};

		let keyHandler = function(e) {
			if(e.which === 13){
				addDevice(null);
			}
		};

		let addEventListeners = function() {
			objects.submitButton.on('click', addDevice);
			objects.inputName.on('keydown', keyHandler);
		};

		this.firstRun = function() {
			addEventListeners();
		};
	}

	name() {
		return "AddAccount";
	}

	init() {
		this.firstRun();
	}
}
export default AddAccount;
