class Home {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			accountUrl: '/api/account/id/',
			locationsByUserIdUrl: '/api/locations/userin',
			locationsById: '/api/locations/in'
		};

		let selectors = {
			wrapper: '.home'
		};

		let objects = {
			wrapper: $(selectors.wrapper)
		};

		let id = objects.wrapper.data('id'),
			account = objects.wrapper.data('account'),
			accountObj;

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
