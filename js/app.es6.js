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

let app = new Main($, [
	Login,
	AccountDetails,
	LocationDetails,
	DeviceDetails,
	UserDetails,
	AddDevice,
	AddAccount,
	AddLocation,
	AddUser
], $('[data-module]'), Utils);

app.init();
