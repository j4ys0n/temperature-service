import $ from './lib/jquery-1.11.2.min';
import Utils from './modules/Utils.es6';
import Main from './modules/Main.es6';
import Login from './modules/Login.es6';
import AccountDetails from './modules/AccountDetails.es6';
import LocationDetails from './modules/LocationDetails.es6';
import DeviceDetails from './modules/DeviceDetails.es6';
import UserDetails from './modules/UserDetails.es6';
import AddDevice from './modules/AddDevice.es6';
import AddAccount from './modules/AddAccount.es6';
import AddLocation from './modules/AddLocation.es6';
import AddUser from './modules/AddUser.es6';
import TemperatureChart from './modules/TemperatureChart.es6';
import HumidityChart from './modules/HumidityChart.es6';
import IRChart from './modules/IRChart.es6';
import Map from './modules/Map.es6';
import Home from './modules/Home.es6';

let app = new Main($, [
	Login,
	AccountDetails,
	LocationDetails,
	DeviceDetails,
	UserDetails,
	AddDevice,
	AddAccount,
	AddLocation,
	AddUser,
	TemperatureChart,
	HumidityChart,
	IRChart,
	Map,
	Home
], $('[data-module]'), Utils);

app.init();


//FOR DEBUGGING
window._app = app;
