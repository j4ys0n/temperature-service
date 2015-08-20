class DocDetails {
	constructor($, Utils, form, deleteUrl) {
		let utils = new Utils();

		let deleteResponseHandler = function(res) {
			utils.debugConsole(res);
		};

		let deleteDoc = function(e) {
			utils.loadUrl( deleteUrl, 'DELETE', JSON.stringify({id: form.id}), true, deleteResponseHandler );
		};

		let addDeleteButtonListener = function($button){
			$button.on('click', deleteDoc);
		};

		addDeleteButtonListener($(form.delete));
	}
}

export default DocDetails;
