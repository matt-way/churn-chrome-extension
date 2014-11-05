/**
 * Churn chrome extension 2014
 * Main application file
 **/

angular.module('churn-chrome-ext', ['churn.ext.screens',
									'churn.videos'])
	.config(['$screensProvider',
	function($screensProvider){

		$screensProvider
			.screen('videos', 'app/videos/videos.html')
			.screen('login', 'app/login/login.html')
			.screen('channels', 'app/channels/channels.html')
			.screen('saved', 'app/saved/saved.html');
	}])
	.run(['$screens',
	function($screens){
		$screens.load('videos');
	}]);