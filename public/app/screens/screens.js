/**
 * Churn chrome extension 2014
 * Custom route like screens manager
 **/

angular.module('churn.ext.screens', [])
	.provider('$screens', [
	function(){

		var screenDefs = {};

		this.screen = function(name, path) {
			screenDefs[name] = {
				path: path
			};

			return this;
		};

		this.$get = [
		function(){

			var state = {};

			return {
				load: function(name) {
					state.current = screenDefs[name];
				},
				getState: function() { return state; }
			}
		}];
	}])
	.directive('screen', ['$screens',
	function($screens){
		return {
			template: '<div ng-include="state.current.path"></div>',
			link: function(scope, elem, attrs) {

				scope.state = $screens.getState();
			}
		};
	}]);