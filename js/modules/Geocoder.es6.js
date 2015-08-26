class Geocoder {
	constructor() {
		let GoogleMapsLoader = require('google-maps'),
			geocoder;

		this.geocode = function(address, callback) {
			geocoder.geocode({address: address}, callback);
		};

		GoogleMapsLoader.load(function( google ){
			geocoder = new google.maps.Geocoder();
		});
	}

	name() {
		return "Geocoder";
	}
}
export default Geocoder;
