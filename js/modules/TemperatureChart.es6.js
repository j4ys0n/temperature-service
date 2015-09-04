class TemperatureChart {
	constructor($, Utils) {
		let utils = new Utils();
		window.jQuery = $;

		let constants = {
			deviceUrl: '/api/device/id/'
		};

		let selectors = {
			wrapper: '.chart-container',
			chart: '#chart',
			legend: '#legend',
			yaxis: '#y_axis'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			chart: $(selectors.chart),
			legend: $(selectors.legend),
			yaxis: $(selectors.yaxis)
		};

		let d3 = require('d3'),
			//j = require('jQuery'),
			Rickshaw = require('rickshaw'),
			moment = require('moment'),
			id = objects.wrapper.data('ids'),
			chartSeries = [],
			colors = ['#c05020', '#1367e5'],
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
				element: document.getElementById('legend')
			});

			// var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
			// 	graph: graph,
			// 	legend: legend
			// });

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
				element: document.getElementById('y_axis')
			});

			y_axis.render();

			var slider = new Rickshaw.Graph.RangeSlider.Preview({
				graph: graph,
				element: document.getElementById('slider')
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
					name: 'Temperature'
				};
				currentColor++;
				utils.debugConsole('temp data');
				utils.debugConsole(data);
			for( var i = 0; i < data.length; i++ ){
				var doc = data[i],
					temps = doc.temperatures.hourly;
				series.id = doc.device.id;
				for( var hour in temps ) {
					for( var interval in temps[hour] ){
						if(temps[hour][interval].time != ''){
							var dt = dateFormatter(new Date(temps[hour][interval].time));
							var localDate = new Date();
							var tzOffset = localDate.getTimezoneOffset() * 60000;
							//dt += tzOffset;
							dt = dt/1000;

							localDate.setDate(localDate.getDate()-5);
							var ldt = dateFormatter(localDate)/1000;

							if(dt > ldt){
								//var dt = d3.time.format("%c")(new Date(temps[hour][interval].time))
								//chartData.push({date: dt, value: temps[hour][interval].value });
								series.data.push({x: dt, y: temps[hour][interval].value });
								if(series.data.length === 1){
									high = temps[hour][interval].value;
									low = temps[hour][interval].value;
								}
								if( temps[hour][interval].value > high ){
									high = temps[hour][interval].value;
								}
								if( temps[hour][interval].value < low ){
									low = temps[hour][interval].value;
								}
							}
						}

					}
				}
			}
			series.data.sort(function(a,b){
				return parseFloat(a.x) - parseFloat(b.x);
			});


			let deviceNameHandler = function(d) {
				utils.debugConsole(d);
				d = JSON.parse(d).data[0];
				series.name = d.name;

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
				utils.loadUrl('/api/temperature/device/all/'+id[i], 'GET', null, false, temperatureRequestHandler);
			}
			//utils.loadUrl('http://52.20.3.36/api/temperature/device/55d2a1628dfc55c704d6aa8d', 'GET', null, false, temperatureRequestHandler);
			//utils.loadUrl('http://52.20.3.36/api/temperature/device/55d2a1628dfc55c704d6aa8d', 'GET', null, false, temperatureRequestHandler);

		};

	}

	name() {
		return "TemperatureChart";
	}

	init() {
		this.firstRun();
	}
}
export default TemperatureChart;
