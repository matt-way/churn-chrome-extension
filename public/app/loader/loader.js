/**
 * Churn chrome extension 2014
 * Service for managing loader screen
 */

angular.module('churn.ext.loader', [])
	.factory('Loader', [
	function(){

		var state = {
			loading: false
		};

		return {
			getState: function() { return state; },
			toggle: function(on) { state.loading = on; }
		};
	}]);