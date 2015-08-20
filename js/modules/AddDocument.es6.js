class AddDocument {
	constructor($, Utils, selectors, url) {
		let utils = new Utils();

		let submitResponseHandler = function(res) {
			utils.debugConsole(res);
		};

		let composeData = function() {
			var d = {};
			for( var index in selectors ) {
				var value = selectors[index];
				if( index != 'submit' && typeof value != 'object' ) {
					d[index] = $(value).val();
				}
				if(typeof value == 'object'){
					for( var subIndex in value ){
						if(d[index] === undefined){
							d[index] = {};
						}
						d[index][subIndex] = $(value[subIndex]).val();
					}
				}
			}
			return d;
		};

		let addDoc = this.addDoc = function(e) {
			var postData = composeData();
			utils.loadUrl(url, 'POST', JSON.stringify(postData), true, submitResponseHandler);
		};

		let addSubmitButtonListener = function($button){
			$button.on('click', addDoc);
		}

		addSubmitButtonListener($(selectors.submit));

	}
}
export default AddDocument;
