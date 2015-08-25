import DocDetails from './DocDetails.es6';

class Login extends DocDetails {
	constructor($, Utils) {
		let utils = new Utils();

		let constants = {
			loginUrl: '/api/users/username'
		};

		let selectors = {
			wrapper: '.login-container',
			inputs: 'input[type="text"], input[type="password"]',
			submit: 'button.submit-login'
		};

		let objects = {
			wrapper: $(selectors.wrapper_)
		};

		let forms = {
			inputs: $(selectors.inputs),
			submit: $(selectors.submit)
		};

		let loginResponseHandler = function( res ) {
			utils.debugConsole('user id: '+ res.data[0]._id);
		};

		super($, Utils, forms, {update: constants.loginUrl,
								updateCallback: loginResponseHandler}, false);
	}

	name(){
		return "Login";
	}

	init(){

	}
}
export default Login;
