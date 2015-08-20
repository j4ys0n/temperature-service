import AddDocument from './AddDocument.es6';

class AddUser extends AddDocument {
	constructor($, Utils) {
		let constants = {
			addUrl: '/api/users/new'
		};

		let form = {
			submit: '.add-user',
			user_name: 'input#username',
			first_name: 'input#firstname',
			last_name: 'input#lastname',
			email: 'input#email',
			phone: 'input#phone',
			notification_scheme: 'input#notifications',
			password: 'input#password'
		};

		super($, Utils, form, constants.addUrl);

		this.firstRun = function() {};
	}

	name() {
		return "AddUser";
	}

	init() {
		this.firstRun();
	}
}

export default AddUser;
