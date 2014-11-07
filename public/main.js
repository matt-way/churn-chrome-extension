/**
 * Churn chrome extension 2014
 * Main application file
 **/

angular.module('churn-chrome-ext', ['churn.ext.screens',
									'churn.ext.channels',
									'churn.ext.loader',
									'churn.ext.error',
									'churn.ext.chrome',
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
	.controller('MainCtrl', ['$scope', '$screens', 'Token', 'Loader', 'Chrome',
	function($scope, $screens, Token, Loader, Chrome){

		$scope.loadState = Loader.getState();
		Loader.toggle(true);

		// check that the api has a valid token
		Token.loadToken().then(function(){
			Chrome.getVideoId().then(function(id){
				$screens.load('channels');
			}, function(err){
				// TODO: handle no video on page found
			});
		}, function(err){
			Loader.toggle(false);
			$screens.load('login');
		});
	}]);