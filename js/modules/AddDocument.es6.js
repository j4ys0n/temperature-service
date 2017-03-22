import Geocoder from './Geocoder.es6';

class AddDocument {
	constructor($, Utils, selectors, url) {
		let utils = new Utils(),
			bcrypt = require('bcryptjs'),
			postData,
			g = new Geocoder();

		let submitResponseHandler = function(res) {
			utils.debugConsole(res);
		};

		let composeData = function() {
			var d = {};
			for( var index in selectors ) {
				var value = selectors[index];
				if( index != 'submit' && typeof value != 'object' ) {
					var $v = $(value);
					d[index] = $v.val();
					if ($v.data('action') === 'encrypt') {
						var salt = bcrypt.genSaltSync(10);
						d[index] = bcrypt.hashSync(d[index], salt);
					}
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

		let storeDoc = function() {
			utils.loadUrl(url, 'POST', JSON.stringify(postData), true, submitResponseHandler);
		};

		let geocodeResponseHandler = function(res, status){
			if(status === 'OK') {
				postData.address.coords = [res[0].geometry.location.lng(), res[0].geometry.location.lat()];
				storeDoc();
			}
		};

		let addDoc = this.addDoc = function(e) {
			postData = composeData();
			if(postData.address != undefined){
				if(postData.address.coords === 'geocode') {
					utils.debugConsole('geocode me');
					var address = postData.address.address1 + ' ' + postData.address.city + ', ' + postData.address.state + ' ' + postData.address.zip;
					g.geocode(address, geocodeResponseHandler);
				}
			}else{
				utils.debugConsole(postData);
				storeDoc();
			}
		};

		let addSubmitButtonListener = function($button){
			$button.on('click', addDoc);
		};

		addSubmitButtonListener($(selectors.submit));

	}
}
export default AddDocument;
