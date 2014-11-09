/**
 * Churn chrome extension 2014
 * Controller for final successful save screen (for sharing too)
 **/

angular.module('churn.ext.saved', [])
	.controller('Saved', ['$scope', 'Chrome',
	function($scope, Chrome){

		$scope.video = Chrome.getVideo();

		if($scope.video.pointerId){
			$scope.shareText = 'Would you like to share your newly saved video?';	
		}else{
			$scope.shareText = 'Would you like to share your new channel?';
		}		

		// get correct url from ids
		var getURL = function(channelId, videoId) {
			var url = 'http://churn.tv/c/' + channelId;
			if(videoId){
				url += '/v/' + videoId;
			}
			return url;
		};

		function popup(url, title) {
			var params = 'width=600,height=350,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0';
			var win = window.open(url, title || '', params);
			win.focus();
		}

		$scope.shareFacebook = function() {
			popup('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(getURL($scope.video.channelId, $scope.video.pointerId)));
		};

		$scope.shareTwitter = function() {
			popup('https://twitter.com/share?url=' + encodeURIComponent(getURL($scope.video.channelId, $scope.video.pointerId)));
		};
	}]);