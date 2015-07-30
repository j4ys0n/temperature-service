import $ from '../js/jquery-1.11.2.min';
import Main from '../js/Main.es6';
import VideoHero from '../js/Sample.es6';


describe('Main module', function(){
	let module,
		modules = [VideoHero, Article],
		pageMock = $('<div data-module="Sample"></div>');

	beforeEach( () => {
		module = new Main($, modules, pageMock);
		module.init();
	});

	it('should load all modules on the page', () => {
		expect(module.modulesLoaded()).toEqual(modules.length);
		expect(module.modulesLoaded()).toEqual(pageMock.length);
	});

});
