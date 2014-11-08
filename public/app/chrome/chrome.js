/**
 * Churn chrome extension 2014
 * Objects for managing chrome extension interfaces, and retrieving
 * video ids from pages
 */

angular.module('churn.ext.chrome', [])
	.factory('Chrome', ['$q', '$http',
	function($q, $http){

		var video = null;
		var reg = /(?:http|https|)(?::\/\/|)(?:www.|)(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]))([\w\-]{11})[a-z0-9;:@?&%=+\/\$_.-]*/;
		
		function getVideoDetails(id, def) {
			// get gdata for particular youtube video
			$http.get('http://gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=json').then(function(result){
				video = {
					id: id,
					title: result.data.entry.title.$t
				};
				def.resolve(video);
			});			
		}

		function loadVideo() {
			var deferred = $q.defer();

			// attempt to get a video id from the page
			if(chrome && chrome.tabs){
				chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
					var m = reg.exec(tabs[0].url);
					if(m){
						getVideoDetails(m[1], deferred);
					}else{
						// check the page content
						chrome.tabs.executeScript({ 
							code: "document.getElementsByTagName('html')[0].innerHTML;"
						}, function(html) {							
							m = reg.exec(html);
							if(m){
								getVideoDetails(m[1], deferred);								
							}else{
								deferred.reject();
							}
						});
					}
				});	
			}else{	
				video = { id: '1234567' };
				deferred.resolve(video);
			}

			return deferred.promise;
		}

		return {
			loadVideo: loadVideo,
			getVideo: function() { return video; } 
		};
	}])