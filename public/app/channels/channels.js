/**
 * Churn chrome extension 2014
 * Controller for channels listing page for saving videos
 **/

angular.module('churn.ext.channels', [])
	.controller('Channels', ['$scope', '$screens', 'API', 'Loader', 'Chrome', 'Error',
	function($scope, $screens, API, Loader, Chrome, Error){

		$scope.video = Chrome.getVideo();

		// attempt to load the users channels
		API.User.editable().$promise.then(function(result){
			$scope.channels = result.data;
			// dev sample
			Loader.toggle(false);
		}, function(err){
			// channels could not be loaded, so go to error screen
			Error.load('Invalid token found. Please sign back in at churn.tv');
			Loader.toggle(false);
		});

		$scope.saveTo = function(id) {
			Loader.toggle(true);
			
			// attempt to add the video to the channel
			var url = 'https://www.youtube.com/watch?v=' + $scope.video.id;
			// for now create the youtube url to provide to the api
			return API.Channel.addVideo({ channelId: id, url: url }).$promise.then(function(result){
				// successfully added
				$screens.load('saved');
				Loader.toggle(false);					
			}, function(err){
				// go to error screen
				Error.load('Could not save video to channel.');
				Loader.toggle(false);
			});
		};

		$scope.newChannel = function() {
			$screens.load('newchannel');
		};
	}])
	.controller('NewChannel', ['$scope',
	function($scope){
		
	}]);