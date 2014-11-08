/**
 * Churn chrome extension 2014
 * Service for managing error screen
 */

angular.module('churn.ext.error', [])
	.factory('Error', [
	function(){

		var state = {
			visible: false,
		};

		return {
			getState: function() { return state; },
			load: function(text) {
				state.text = text;
				state.visible = true;
			}
		};
	}]);