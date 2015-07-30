class Main {
	constructor($, imports, modules, Utils) {
		this._imports = imports;
		this._modulesLoaded = 0;

		let getModulesOnPage = function() {
			let _modules = [],
                module,
                i = 0;
			for (i; i < modules.length; i++){
				module = $(modules[i]).data('module');
				_modules.push(module);
			}
			return _modules;
		};

		this.instantiateModules = function(modules) {
			var modulesOnPage = getModulesOnPage(),
                module,
				name,
				loaded = [],
                i = 0;

			for (i; i < modules.length; i++){
				name = Object.create(modules[i]).prototype.name();
				if(modulesOnPage.indexOf(name) > -1 && loaded.indexOf(name) === -1){
					module = new modules[i]($, Utils); //init module. pass jQuery.
					module.init();
					loaded.push(name);
					this._modulesLoaded++;
				}
			}
		};

		this.browserHandler = function() {
			var ua = navigator.userAgent.toLowerCase(),
			isAndroid = ua.indexOf("android") > -1,
			isIE9 = ua.indexOf("msie 9") > -1,
			isIE = ua.indexOf("msie") > -1 || ua.indexOf("trident") > -1;

			if(isAndroid) {
				document.body.className += ' android';
			}else if(isIE) {
				document.body.className += ' ie';
			}
		};
	}

	modulesLoaded() {
		return this._modulesLoaded;
	}

	init() {
		this.browserHandler();
		this.instantiateModules(this._imports);
	}
}

export default Main;
