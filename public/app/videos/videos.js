/**
 * Churn chrome extension 2014
 * Controller for video list page
 **/

angular.module('churn.videos', [])
	.controller('VideoList', ['$scope', '$screens',
	function($scope, $screens){


		var reg = /(?:http|https|)(?::\/\/|)(?:www.|)(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]))([\w\-]{11})[a-z0-9;:@?&%=+\/\$_.-]*/;
	
		// run the loader while attempting to find videos on the current page

		console.log('querying');
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
		//chrome.tabs.getCurrent(function(tab){
			console.log(tabs);
			var m = reg.exec(tabs[0].url);
			if(m){
				$scope.$apply(function(){
					$scope.id = m[1];
				});				
			}else{
				// check the page content
				console.log('executing script');
				chrome.tabs.executeScript({ 
					code: "document.getElementsByTagName('html')[0].innerHTML;"
				}, function(ps1) {
					console.log(ps1);
					m = reg.exec(ps1);
					$scope.$apply(function(){
						if(m){
						$scope.id = m[1];
					}else{
						$scope.id = 'ahhhh';
					}
					});
					
				});
			}
		});
	}]);