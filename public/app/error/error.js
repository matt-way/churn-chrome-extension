/**
 * Churn chrome extension 2014
 * Service for managing error screen
 */

angular.module('churn.ext.error', [])
	.factory('Error', [
	function(){

		var state = {};

		return {
			getState: function() { return state; }
		}
	}]);