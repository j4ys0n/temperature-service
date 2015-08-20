class UserDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			deleteUrl: '/api/users/delete/id'
		};

		let selectors = {
			wrapper: '.user-details',
			deleteBtn: '.delete-user'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			deleteBtn: $(selectors.deleteBtn)
		};

		let id = '';

		let deleteResponseHandler = function(res) {
			utils.debugConsole(res);
		};

		let deleteBtnHandler = function(e) {
			utils.debugConsole('delete');
			utils.loadUrl( constants.deleteUrl, 'DELETE', JSON.stringify({id: id}), true, deleteResponseHandler );
		};

		let addEventListeners = function() {
			objects.deleteBtn.on('click', deleteBtnHandler);
		};

		this.firstRun = function() {
			id = objects.wrapper.data('id');
			addEventListeners();
		}
	}

	name() {
		return "UserDetails";
	}

	init() {
		this.firstRun();
	}
}

export default UserDetails;
