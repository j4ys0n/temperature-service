import $ from './lib/jquery-1.11.2.min';
import Utils from './modules/Utils.es6';
import Main from './modules/Main.es6';
import Login from './modules/Login.es6';

let app = new Main($, [
	Login
], $('[data-module]'), Utils);

app.init();
