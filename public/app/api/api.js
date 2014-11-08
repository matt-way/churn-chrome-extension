/**
 * Churn chrome extension 2014
 * Service for interfacing the churn api
 **/

// This service wraps the entire API for Churns backend using custom $resource objects
// It also hooks $http to support token based auth

angular.module('churn.ext.api', ['ngResource'])
	.factory('API', ['$resource', 'globals', '$q', 
	function($resource, globals, $q){

		// Auth related
		var AuthAPI = $resource(globals.api + '/auth/:action', { action: '@action' }, {
			newToken: { method: 'GET', params: { action: 'newtoken' }},
			verifyFacebook: { method: 'POST', params: { action: 'facebook' }}
		});

		// User related
		var UserAPI = $resource(globals.api + '/user/:typeId', 
			{ typeId: '@typeId' }, {
				currentUser: { method: 'GET' },
				favourites: { method: 'GET', params: { typeId: 'favourites' }},
				editable: { method: 'GET', params: { typeId: 'editable' }},
				history: { method: 'GET', params: { typeId: 'history' }}
			});

		// Channel related
		var ChannelAPI = $resource(globals.api + '/channel/:channelId/:type/:typeId/:action/:actionId',
			{ channelId: '@channelId', type: '@type', typeId: '@typeId', action: '@action', actionId: '@actionId' }, {
				create: { method: 'POST', params: { channelId: 'create' }},
				update: { method: 'POST' },
				load: { method: 'GET' },
				viewed: { method: 'GET', params: { type: 'viewed' }},
				addVideo: { method: 'POST', params: { type: 'video', action: 'add' }},
				saveVideo: { method: 'GET', params: { type: 'video', action: 'save' }},
				deleteVideo: { method: 'GET', params: { type: 'video', action: 'delete' }},
				loadVideos: { method: 'GET', params: { type: 'video', action: 'middle' }},
				moveVideo: { method: 'POST', params: { type: 'video', action: 'move' }},
				saveTrim: { method: 'POST', params: { type: 'video', action: 'updatetrim' }},
				subscribe: { method: 'GET', params: { type: 'subscribe' }},
				unsubscribe: { method: 'GET', params: { type: 'unsubscribe' }},
				channelShareUpdate: { method: 'POST', params: { type: 'shares' }},
				videoShareUpdate: { method: 'POST', params: { type: 'video', action: 'shares' }},
				access: { method: 'GET', params: { type: 'access' }},
				viewedVideo: { method: 'GET', params: { type: 'video', action: 'viewed' }},
				search: { method: 'GET', params: { channelId: 'search' }}
			});

		// category related
		var CategoriesAPI = $resource(globals.api + '/category/:categoryId',
			{ categoryId: '@categoryId' }, {
				load: { method: 'GET' }
			});

		return {
			User: UserAPI,
			Auth: AuthAPI,
			Channel: ChannelAPI,
			Categories: CategoriesAPI
		};
	}])
.factory('Token', ['$q',
function($q){

	var userToken;

	function loadToken() {
		var deferred = $q.defer();

		if(!chrome || !chrome.tabs){
			// development (allow with static token)
			userToken = 'test';
			deferred.resolve();
		}else{
			chrome.tabs.create({
			    active: false,
			    url: 'http://churn.tv/robots.txt'
			}, function(tab) {
			    chrome.tabs.executeScript(tab.id, {
			        code: 'localStorage.getItem("ngStorage-token");'
			    }, function(token) {
			        chrome.tabs.remove(tab.id);
			         				        
			        if(token && token.length > 0){
			        	var t = token[0];
			        	userToken = t.substr(1, t.length-2);
			        	
			        	deferred.resolve();
			        }else{
			        	deferred.reject();
			        }
			    });
			});
		}

		return deferred.promise;
	}

	return {
		loadToken: loadToken,
		getToken: function() { return userToken; }
	};
}])
	// interceptor to use token system with api
	.factory('TokenAuthInterceptor', ['$q', 'globals', 'Token',
	function($q, globals, Token){
		return {
			
			request: function(config){				
				config.headers = config.headers || {};
				// only alter api specific churn calls
				if(config.url.indexOf(globals.api) === 0){
					var token = Token.getToken();
					config.headers.Authorization = 'Bearer ' + token;
				}
				return config;
			},
			response: function(response){
				if(response.status == 401){
					// TODO: deal with failed auth on request
				}
				return response || $q.when(response);
			}
		};
	}])
	// add the auth interceptor to api traffic
	.config(['$httpProvider', function($httpProvider){
		$httpProvider.interceptors.push('TokenAuthInterceptor');
	}]);