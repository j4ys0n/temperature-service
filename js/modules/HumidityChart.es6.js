class HumidityChart {
	constructor($, Utils) {
		let utils = new Utils();
		window.jQuery = $;

		let constants = {
			deviceUrl: '/api/device/id/'
		};

		let selectors = {
			wrapper: '.chart-container.humid',
			chart: '#chart',
			legend: '#legend',
			yaxis: '#y_axis',
			stats: '.stats',
			slider: '#slider'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			chart: $(selectors.wrapper).find(selectors.chart),
			legend: $(selectors.wrapper).find(selectors.legend),
			yaxis: $(selectors.wrapper).find(selectors.yaxis),
			stats: $(selectors.wrapper).find(selectors.stats),
			slider: $(selectors.wrapper).find(selectors.slider)
		};

		let d3 = require('d3'),
			//j = require('jQuery'),
			Rickshaw = require('rickshaw'),
			moment = require('moment'),
			id = objects.wrapper.data('ids'),
			chartSeries = [],
			colors = ['#184aed', '#2c18ed'],
			currentColor = 0,
			low = 0,
			high = 100,
			rangePadding = 10;

		let rickshawChart = function() {
			objects.chart.empty();
			objects.legend.empty();
			objects.yaxis.empty();
			var graph = new Rickshaw.Graph( {
				element: objects.chart[0],
				width: 960,
				height: 500,
				max: high + rangePadding,
				min: low - rangePadding,
				renderer: 'line',
				series: chartSeries
			});

			graph.render();

			var hoverDetail = new Rickshaw.Graph.HoverDetail({
				graph: graph
			});

			var legend = new Rickshaw.Graph.Legend({
				graph: graph,
				element: objects.legend[0]
			});

			var timeFormat = function(d) {
				//d = moment(d);
				var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				d = moment(new Date(d*1000));
				return weekday[d.weekday()]+' '+d.hour()+':'+d.minute();
			}

			var x_axis = new Rickshaw.Graph.Axis.X({
				graph: graph,
				tickFormat: timeFormat
			});

			x_axis.render();

			var y_axis = new Rickshaw.Graph.Axis.Y( {
				graph:graph,
				orientation: 'left',
				element: objects.yaxis[0]
			});

			y_axis.render();

			var slider = new Rickshaw.Graph.RangeSlider.Preview({
				graph: graph,
				element: objects.slider[0]
			});

			var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
				graph: graph,
				legend: legend,
				disabledColor: function() { return 'rgba(0,0,0,0.2)'}
			});

			var toggle = new Rickshaw.Graph.Behavior.Series.Toggle({
				graph: graph,
				legend: legend
			});
		};

		let dateFormatter = function(dt) {
			return Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds());
		}

		let temperatureRequestHandler = function( res ){
			var data = JSON.parse(res).data,
				series = {
					color: colors[currentColor],
					data: [],
					id: '',
					name: 'Humidity'
				};
				currentColor++;
			for( var i = 0; i < data.length; i++ ){
				var doc = data[i],
					temps = doc.temperatures.readings;
				series.id = doc.device.id;

				for( var i = 0; i < temps.length; i++ ) {
					var tmp = temps[i];
					if(tmp.time != ''){
						tmp.humid = parseFloat(tmp.humid);
						var dt = dateFormatter(new Date(tmp.time));
						var localDate = new Date();
						var tzOffset = localDate.getTimezoneOffset() * 60000;

						localDate.setDate(localDate.getDate()-2);
						dt = dt/1000;
						series.data.push({x: dt, y: tmp.humid });
					}
				}
			}
			series.data.sort(function(a,b){
				return parseFloat(a.x) - parseFloat(b.x);
			});


			let deviceNameHandler = function(d) {
				utils.debugConsole(d);
				d = JSON.parse(d).data[0];

				chartSeries.push(series);
				rickshawChart();
			};

			utils.loadUrl(constants.deviceUrl+series.id, 'GET', null, false, deviceNameHandler);
			//chartSeries.push(series);
			//rickshawChart();
		};

		this.firstRun = function() {
			id = id.split(',');
			//utils.debugConsole(id);

			for(var i = 0; i < id.length; i++){
				utils.loadUrl('/api/temperature/device/'+id[i], 'GET', null, false, temperatureRequestHandler);
			}
			//utils.loadUrl('http://52.20.3.36/api/temperature/device/55d2a1628dfc55c704d6aa8d', 'GET', null, false, temperatureRequestHandler);
			//utils.loadUrl('http://52.20.3.36/api/temperature/device/55d2a1628dfc55c704d6aa8d', 'GET', null, false, temperatureRequestHandler);

		};

	}

	name() {
		return "HumidityChart";
	}

	init() {
		this.firstRun();
	}
}
export default HumidityChart;
