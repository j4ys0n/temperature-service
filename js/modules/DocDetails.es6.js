class DocDetails {
	constructor($, Utils, form, urls) {
		let utils = new Utils();

		/**
			DELETE
		**/

		let deleteResponseHandler = function(res) {
			utils.debugConsole(res);
		};

		let deleteDoc = function(e) {
			utils.loadUrl( urls.delete, 'DELETE', JSON.stringify({id: form.id}), true, deleteResponseHandler );
		};

		let toggleDeleteEnable = function(e){
			if(this.checked){
				$(form.delete).removeAttr('disabled');
			}else{
				$(form.delete).attr('disabled', 'true');
			}
		};

		let addDeleteButtonListener = function($button, $enable){
			$enable.on('change', toggleDeleteEnable);
			$button.on('click', deleteDoc);
		};

		addDeleteButtonListener($(form.delete), $(form.enable));

		/**
			ADD LINKS
		**/

		this.addRelatedByIds = function(ids, getDocsUrl, viewDocUrl, docNameField, $container) {
			ids = (ids === '') ? [] : ids.split(',');

			let addLink = function(text, url) {
				var $link = $(document.createElement('a'));
				$link.text(text);
				$link.attr('href', url);
				$container.append($link);
			};

			let getRelatedResponseHandler = function( res ) {
				var docs = JSON.parse(res).data,
					i = 0;

				for (i; i < docs.length; i++){
					addLink(docs[i][docNameField], viewDocUrl+docs[i]._id);
				}
			};

			for(var i = 0; i < ids.length; i++){
				utils.loadUrl(getDocsUrl+ids[i], 'GET', null, false, getRelatedResponseHandler);
			}
		};
	}
}

export default DocDetails;
