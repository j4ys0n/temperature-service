class Map {
	constructor($, Utils) {
		let utils = new Utils(),
			GoogleMapsLoader = require('google-maps'),
			mapOptions,
			coords,
			map;

		let selectors = {
			map: '.map-canvas'
		};

		let objects = {
			map: $(selectors.map)
		};



		this.firstRun = function() {
			name = objects.map.data('name');
			coords = objects.map.data('coords').split(',');
			utils.debugConsole(coords);
			GoogleMapsLoader.load(function( google ){
				mapOptions = {
					center: new google.maps.LatLng( coords[1], coords[0] ),
					zoom: 13
				};
				map = new google.maps.Map( objects.map[0] , mapOptions );
				var marker = new google.maps.Marker({
					map: map,
					draggable: false,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng( coords[1], coords[0] ),
					title: name
				});
			});
		};

	}

	name() {
		return "Map";
	}

	init() {
		this.firstRun();
	}
}
export default Map;
