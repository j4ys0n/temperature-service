import AddDocument from './AddDocument.es6';

class AddLocation extends AddDocument {
	constructor($, Utils) {
		let constants = {
			addUrl: '/api/locations/new'
		};

		let selectors = {
			submit: '.add-location',
			name: 'input#name',
			address: {
				company: 'input#company',
				address1: 'input#address1',
				address2: 'input#address2',
				city: 'input#city',
				state: 'input#state',
				zip: 'input#zip',
				coords:  'input#coords'
			}
		};

		super($, Utils, selectors, constants.addUrl);

		this.firstRun = function() {};
	}

	name() {
		return "AddLocation";
	}

	init() {
		this.firstRun();
	}
}

export default AddLocation;
