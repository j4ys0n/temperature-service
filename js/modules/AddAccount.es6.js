import AddDocument from './AddDocument.es6';

class AddAccount extends AddDocument {
	constructor($, Utils) {
		let constants = {
			addUrl: '/api/account/new'
		};

		let selectors = {
			submit: '.add-account',
			name: 'input#name'
		};

		super($, Utils, selectors, constants.addUrl);

		this.firstRun = function() {};
	}

	name() {
		return "AddAccount";
	}

	init() {
		this.firstRun();
	}
}
export default AddAccount;
