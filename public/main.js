/**
 * Churn chrome extension 2014
 * Main application file
 **/

angular.module('churn-chrome-ext', ['churn.ext.screens',
									'churn.ext.channels',
									'churn.ext.api'])
	.constant('globals', {
		api: 'http://api.churn.tv'
	})
	.config(['$screensProvider',
	function($screensProvider){

		$screensProvider
			.screen('login', 'app/login/login.html')
			.screen('channels', 'app/channels/channels.html')
			.screen('saved', 'app/saved/saved.html')
			.screen('error', 'app/error/error.html');
	}])
	.controller('MainCtrl', ['$scope', '$screens', 'API',
	function($scope, $screens, API){

		$scope.root = {
			loading: true
		};

		// check that the api has a valid token
		API.loadToken().then(function(){
			$screens.load('channels');	
		}, function(err){
			$scope.root.loading = false;
			$screens.load('login');
		});
	}]);