import DocDetails from './DocDetails.es6';

class DeviceDetails extends DocDetails {
	constructor($, Utils) {
		let d3 = require('d3'),
			//j = require('jQuery'),
			Rickshaw = require('rickshaw'),
			utils = new Utils();

		let constants = {
			getDeviceURL: '/api/device/id/',
			getTempsURL: '/api/temperature/device/',
			deleteUrl: '/api/device/delete/id',
			updateUrl: '/api/device/update/nameversion'
		};

		let selectors = {
			wrapper: '.device-details',
			deleteBtn: '.delete-device',
			enableDelete: '#enable-delete',
			//inputs
			inputs: 'input[type="text"]',
			submit: 'button.update-device'
		};

		let objects = {
			wrapper: $(selectors.wrapper)
		};

		let id = objects.wrapper.data('id');

		let forms = {
			id: id,
			delete: {
				deleteBtn: $(selectors.deleteBtn),
				enable: $(selectors.enableDelete)
			},
			inputs: $(selectors.inputs),
			submit: $(selectors.submit)
		};

		let rickshawChart = function( data ) {

			data.sort(function(a,b){
				return parseFloat(a.x) - parseFloat(b.x);
			});

			var graph = new Rickshaw.Graph( {
				element: document.getElementById('chart'),
				width: 960,
				height: 500,
				min: 50,
				renderer: 'line',
				series: [
					{
						color: '#c05020',
						data: data,
						name: 'Temperature'
					}
				]
			});
			graph.render();

			var hoverDetail = new Rickshaw.Graph.HoverDetail({
				graph: graph
			});

			var legend = new Rickshaw.Graph.Legend({
				graph: graph,
				element: document.getElementById('legend')
			});

			var timeFormat = function(d) {
				d = new Date(d);
				return d3.time.format('%c')(d);
			}

			var x_axis = new Rickshaw.Graph.Axis.X({
				graph: graph,
				tickFormat: timeFormat
			});

			x_axis.render();

			var y_axis = new Rickshaw.Graph.Axis.Y( {
				graph:graph,
				orientation: 'left',
				element: document.getElementById('y_axis')
			});

			y_axis.render();
		};

		let dateFormatter = function(dt) {
			return Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds());
		}

		let temperatureRequestHandler = function( res ){
			var data = JSON.parse(res).data,
				chartData = [];
			for( var i = 0; i < data.length; i++ ){
				var doc = data[i],
					temps = doc.temperatures.hourly;
				for( var hour in temps ) {
					for( var interval in temps[hour] ){
						if(temps[hour][interval].time != ''){
							var dt = dateFormatter(new Date(temps[hour][interval].time))/1000;
							//var dt = d3.time.format("%c")(new Date(temps[hour][interval].time))
							//chartData.push({date: dt, value: temps[hour][interval].value });
							chartData.push({x: dt, y: temps[hour][interval].value });
						}

					}
				}
			}
			console.log(chartData);
			rickshawChart(chartData);
		};

		let deviceRequestHandler = function( res ){
			var device = JSON.parse(res).data;
			utils.debugConsole(device);
		};

		super($, Utils, forms, {delete: constants.deleteUrl,
								update: constants.updateUrl });

		this.firstRun = function() {
			utils.loadUrl( constants.getDeviceURL+id, 'GET', null, false, deviceRequestHandler );

			//utils.loadUrl('http://52.20.3.36/api/temperature/device/all/55d2a1628dfc55c704d6aa8d', 'GET', null, false, temperatureRequestHandler);
			utils.loadUrl('/api/temperature/device/all/'+id, 'GET', null, false, temperatureRequestHandler);
		};
	}

	name(){
		return "DeviceDetails";
	}

	init(){
		this.firstRun();
	}
}
export default DeviceDetails;
