import DocDetails from './DocDetails.es6';

class UserDetails extends DocDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			deleteUrl: '/api/users/delete/id',
			getAccountUrl: '/api/account/id/',
			viewAccountUrl: '/accounts/view/'
		};

		let selectors = {
			wrapper: '.user-details',
			account: '#linked-account',
			//delete selects
			deleteBtn: '.delete-user',
			enableDelete: '#enable-delete',
			//link selects
			addAccount: '#add-account',
			addAccountForm: '#add-form-account',
			addAccountSelect: '#account-select',
			addAccountSubmit: '#account-select-submit'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			account: $(selectors.account)
		};

		let forms = {
			id: objects.wrapper.data('id'),
			delete: {
				deleteBtn: selectors.deleteBtn,
				enable: $(selectors.enableDelete)
			},
			link: {
				account: {
					docsUrl: '/api/account/all',
					submitUrl: '/api/users/update/account',
					add: $(selectors.addAccount),
					form: $(selectors.addAccountForm),
					select: $(selectors.addAccountSelect),
					selectDisplayField: 'name',
					submit: $(selectors.addAccountSubmit),
					existing: objects.account.data('ids'),
					updateField: 'accountid'
				}
			}

		};

		super($, Utils, forms, {delete: constants.deleteUrl} );

		let self = this;

		self.firstRun = function() {
			var accountUrls = {
				get: constants.getAccountUrl,
				view: constants.viewAccountUrl,
				remove: null,
				removeIdField: null
			};
			self.addRelatedByIds(objects.account.data('ids'), accountUrls, 'name', objects.account);
		};
	}

	name() {
		return "UserDetails";
	}

	init() {
		this.firstRun();
	}
}

export default UserDetails;
