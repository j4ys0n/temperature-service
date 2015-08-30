class Map {
	constructor($, Utils) {
		let utils = new Utils(),
			//locationName,
			type,
			GoogleMapsLoader = require('google-maps'),
			mapOptions,
			coords,
			names,
			map;

		let selectors = {
			map: '.map-canvas'
		};

		let objects = {
			map: $(selectors.map)
		};

		let addMap = function(google, center, markers) {
			mapOptions = {
				center: new google.maps.LatLng( center[1], center[0] ),
				zoom: 13
			};
			map = new google.maps.Map( objects.map[0] , mapOptions );
			markers();
		};

		let multipleMarkers = function(google) {
			coords = objects.map.data('coords').split(';');
			names = objects.map.data('names').split(',');
			utils.debugConsole(coords);
			let markers = function() {
				for(var i = 0; i < coords.length; i++) {
					var c = coords[i].split(',');
					utils.debugConsole('coords: '+c);
					var marker = new google.maps.Marker({
							map: map,
							draggable: false,
							animation: google.maps.Animation.DROP,
							position: new google.maps.LatLng( c[1], c[0] ),
							title: names[i]
						});
				}
			};
			var center = coords[0].split(',');
			addMap(google, center, markers);
		}

		let singleMarker = function(google) {
			coords = objects.map.data('coords').split(',');
			utils.debugConsole(coords);
			let marker = function() {
				var name = objects.map.data('name');
				var marker = new google.maps.Marker({
					map: map,
					draggable: false,
					animation: google.maps.Animation.DROP,
					position: new google.maps.LatLng( coords[1], coords[0] ),
					title: name
				});
			};
			addMap(google, coords, marker);
		};

		this.firstRun = function() {
			var callback;
			type = objects.map.data('type');

			if(type === 'single') {
				callback = singleMarker;
			}else if(type === 'multiple') {
				callback = multipleMarkers;
			}

			GoogleMapsLoader.load(callback);
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
