class DocDetails {
	constructor($, Utils, forms, urls) {
		let utils = new Utils();

		/**
			DELETE
		**/

		let deleteResponseHandler = function(res) {
			utils.debugConsole(res);
		};

		let deleteDoc = function(e) {
			utils.loadUrl( urls.delete, 'DELETE', JSON.stringify({id: forms.id}), true, deleteResponseHandler );
		};

		let toggleDeleteEnable = function(e){
			if(this.checked){
				$(forms.delete.deleteBtn)[0].disabled = false;
			}else{
				$(forms.delete.deleteBtn)[0].disabled = true;
			}
		};

		let addDeleteButtonListener = function($button, $enable){
			$enable.on('change', toggleDeleteEnable);
			$button.on('click', deleteDoc);
		};

		addDeleteButtonListener($(forms.delete.deleteBtn), $(forms.delete.enable));

		/**
			ADD LINKS
		**/

		this.addRelatedByIds = function(ids, urls, docNameField, $container) {
			ids = (ids === '') ? [] : ids.split(',');
			console.log(ids);

			let addLink = function(text, id) {
				var $span = $(document.createElement('span'));
				var $viewLink = $(document.createElement('a'));
				var $removeLink = $(document.createElement('a'));
				$viewLink.text(text);
				$viewLink.attr('href', urls.view+id);
				$span.addClass('linked-doc');
				$span.append($viewLink);
				if(urls.remove !== null){
					$removeLink.text('-');
					$removeLink.attr('href', '#');
					$removeLink.on('click', function(e){
						e.preventDefault();
						var d = {id: forms.id};
						d[urls.removeIdField] = id;
						utils.loadUrl(urls.remove, 'POST', JSON.stringify(d), true, function(res){
							utils.debugConsole(res);
							$span.remove();
						});
					});
					$span.append(' (').append($removeLink).append(')');
				}
				$container.append($span);
			};

			let getRelatedResponseHandler = function( res ) {
				var docs = JSON.parse(res).data,
					i = 0;
				for (i; i < docs.length; i++){
					addLink( docs[i][docNameField], docs[i]._id );
				}
			};
			utils.debugConsole(ids.length);
			if(ids.length > 0){
				$container.empty();
				for(var i = 0; i < ids.length; i++){
					utils.loadUrl(urls.get+ids[i], 'GET', null, false, getRelatedResponseHandler);
				}
			}
		};

		/**
			LINK DOCUMENT
		**/

		let populateDocuments = function(url, select, displayField, submit, existing) {
			existing = (existing === '') ? [] : existing.split(',');

			let responseHandler = function(res){
				utils.debugConsole(res);
				var docs = JSON.parse(res).data,
					option,
					i = 0;
				for( i; i < docs.length; i++ ){
					option = $(document.createElement('option'));
					option.text(docs[i][displayField]);
					option.attr('value', docs[i]._id);
					select.append(option);
				}
			};

			let selectChangeHandler = function(e) {
				if(existing.indexOf(select.val()) > -1 || select.val() === 'false'){
					submit[0].disabled = true;
				}else{
					submit[0].disabled = false;
				}
			}

			select.on('change', selectChangeHandler);

			utils.loadUrl(url, 'GET', null, false, responseHandler);
		};

		let addLinkForm = function(f, id) {
			f.add.on('click', function(e){
				e.preventDefault();
				f.form.show();
				$(this).hide();
				populateDocuments(f.docsUrl, f.select, f.selectDisplayField, f.submit, f.existing);
			});
			let submitHandler = function( res ){
				utils.debugConsole('link document response: '+res);
			};
			f.submit.on('click', function(e){
				e.preventDefault();
				var d = {id: id};
				d[f.updateField] = f.select.val();
				utils.loadUrl(f.submitUrl, 'POST', JSON.stringify(d), true, submitHandler);
			});
		};

		if(forms.link != undefined){
			for(var item in forms.link) {
				addLinkForm(forms.link[item], forms.id);
			}
		}
	}
}

export default DocDetails;
