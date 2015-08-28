import TemperatureChart from './TemperatureChart.es6';

class Home {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			accountUrl: '/api/account/id/',
			locationsByUserIdUrl: '/api/locations/userin',
			locationsById: '/api/locations/in',
			getDevicesById: '/api/device/in'
		};

		let selectors = {
			wrapper: '.home',
			chart: '.chart-container'
		};

		let objects = {
			wrapper: $(selectors.wrapper),
			chart: $(selectors.chart)
		};

		let id = objects.wrapper.data('id'),
			account = objects.wrapper.data('account'),
			accountObj;

		let deviceRequestHandler = function(res) {
			utils.debugConsole('devices:');
			res = JSON.parse(res).data;
			utils.debugConsole(res);
		}

		let locationsRequestHandler = function(res) {
			//utils.debugConsole(res);
			var devices = [];
			res = JSON.parse(res).data;
			//get device ids
			for(var i = 0; i < res.length; i++){
				//utils.debugConsole(res[i].devices);
				var locDevices = res[i].devices;
				for(var j = 0; j < locDevices.length; j++){

					if(devices.indexOf(locDevices[j]) == -1){
						devices.push(locDevices[j]);
					}
				}
			}
			utils.debugConsole('devices:');
			utils.debugConsole(devices);
			objects.chart.attr('data-ids', devices);

			var chart = new TemperatureChart($, Utils);
			chart.init();

			//DO I NEED THIS?
			// if(devices.length > 0){
			// 	utils.loadUrl(constants.getDevicesById, 'POST', JSON.stringify({devices: devices}), true, deviceRequestHandler);
			// }
		};

		let accountRequestHandler = function(res) {
			utils.debugConsole('account:');
			utils.debugConsole(res);
			res = accountObj = JSON.parse(res).data[0];
			utils.debugConsole('locations:');
			if(res.primary_user == id){
				utils.debugConsole(accountObj.locations);
				utils.loadUrl(constants.locationsById, 'POST', JSON.stringify({locations: accountObj.locations}), true, locationsRequestHandler);
			}else{
				utils.debugConsole('show by user');
				utils.loadUrl(constants.locationsByUserIdUrl, 'POST', JSON.stringify({id: id}), true, locationsRequestHandler);
			}
		};

		this.firstRun = function() {
			utils.loadUrl(constants.accountUrl+account, 'GET', null, false, accountRequestHandler);
		};

	}

	name() {
		return "Home";
	}

	init() {
		this.firstRun();
	}
}
export default Home;
