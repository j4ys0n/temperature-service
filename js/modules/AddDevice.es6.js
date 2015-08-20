import AddDocument from './AddDocument.es6';

class AddDevice extends AddDocument {
	constructor($, Utils) {
		let constants = {
			addUrl: '/api/device/new'
		};

		let selectors = {
			submit: '.add-device',
			name: 'input#name',
			version: 'input#version'
		};

		super($, Utils, selectors, constants.addUrl);

		this.firstRun = function() {};
	}

	name() {
		return "AddDevice";
	}

	init() {
		this.firstRun();
	}
}
export default AddDevice;
