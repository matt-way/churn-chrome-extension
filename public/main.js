/**
 * Churn chrome extension 2014
 * Main application file
 **/

angular.module('churn-chrome-ext', ['churn.ext.screens',
									'churn.ext.channels',
									'churn.ext.loader',
									'churn.ext.error',
									'churn.ext.chrome',
									'churn.ext.filters',
									'churn.ext.api'])
	.constant('globals', {
		api: 'http://api.churn.tv'
	})
	.config(['$screensProvider',
	function($screensProvider){

		$screensProvider
			.screen('login', 'app/login/login.html')
			.screen('channels', 'app/channels/channels.html')
			.screen('newchannel', 'app/channels/new.html')
			.screen('saved', 'app/saved/saved.html');
	}])
	.controller('MainCtrl', ['$scope', '$screens', 'Token', 'Loader', 'Chrome', 'Error',
	function($scope, $screens, Token, Loader, Chrome, Error){

		$scope.errorState = Error.getState();
		$scope.loadState = Loader.getState();
		Loader.toggle(true);

		// check that the api has a valid token
		Token.loadToken().then(function(){
			Chrome.getVideoId().then(function(id){
				$screens.load('channels');
			}, function(err){
				Error.load('No videos found on the current page.');
			});
		}, function(err){
			Loader.toggle(false);
			$screens.load('login');
		});
	}]);