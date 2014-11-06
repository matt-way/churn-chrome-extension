/**
 * Churn chrome extension 2014
 * Controller for channels listing page for saving videos
 **/

angular.module('churn.ext.channels', [])
	.controller('Channels', ['$scope', '$screens', 'API',
	function($scope, $screens, API){

		
		$scope.root.loading = false;

		$scope.items = [{},{},{},{}];
		
	}]);