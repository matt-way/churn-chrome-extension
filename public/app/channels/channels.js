/**
 * Churn chrome extension 2014
 * Controller for channels listing page for saving videos
 **/

angular.module('churn.ext.channels', [])
	.controller('Channels', ['$scope', '$screens', 'API', 'Loader', 'Chrome',
	function($scope, $screens, API, Loader, Chrome){

		// attempt to load the users channels
		API.User.editable().$promise.then(function(result){
			$scope.channels = result.data;
			// dev sample
			Loader.toggle(false);
		}, function(err){
			// channels could not be loaded, so go to error screen
			// TODO:
		});

		$scope.saveTo = function(id) {
			Loader.toggle(true);
			Chrome.getVideoId().then(function(videoId){
				// attempt to add the video to the channel
				var url = 'https://www.youtube.com/watch?v=' + videoId;
				// for now create the youtube url to provide to the api
				return API.Channel.addVideo({ channelId: id, url: url }).$promise.then(function(result){
					// successfully added
					$screens.load('saved');
					Loader.toggle(false);					
				}, function(err){
					// go to error screen
					// TODO:
					Loader.toggle(false);
				});
			});
		};

		$scope.newChannel = function() {
			$screens.load('newchannel');
		};
	}]);