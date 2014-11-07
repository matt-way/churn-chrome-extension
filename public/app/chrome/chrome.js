/**
 * Churn chrome extension 2014
 * Objects for managing chrome extension interfaces, and retrieving
 * video ids from pages
 */

angular.module('churn.ext.chrome', [])
	.factory('Chrome', ['$q',
	function($q){

		var id = null;
		var reg = /(?:http|https|)(?::\/\/|)(?:www.|)(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]))([\w\-]{11})[a-z0-9;:@?&%=+\/\$_.-]*/;
		
		function getVideoId() {
			var deferred = $q.defer();

			// attempt to get a video id from the page
			if(chrome && chrome.tabs){
				chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
					var m = reg.exec(tabs[0].url);
					if(m){
						id = m[1];
						deferred.resolve(id);				
					}else{
						// check the page content
						chrome.tabs.executeScript({ 
							code: "document.getElementsByTagName('html')[0].innerHTML;"
						}, function(html) {							
							m = reg.exec(html);
							if(m){
								id = m[1];
								deferred.resolve(id);
							}else{
								deferred.reject();
							}
						});
					}
				});	
			}else{	
				id = 'test';
				deferred.resolve(id);
			}

			return deferred.promise;
		}

		return {
			getVideoId: function() { 
				if(id) { return $q.when(id); }
				return getVideoId();
			}
		};
	}])