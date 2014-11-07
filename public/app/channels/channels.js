/**
 * Churn chrome extension 2014
 * Controller for channels listing page for saving videos
 **/

angular.module('churn.ext.channels', [])
	.controller('Channels', ['$scope', '$screens', 'API', 'Loader', 'Chrome',
	function($scope, $screens, API, Loader, Chrome){

		// attempt to load the users channels
		API.User.editable().$promise.then(function(result){
			console.log(result.channels);
		});

		// dev sample
		Loader.toggle(false);
		
		$scope.items = [{},{},{},{}];
				
	}]);