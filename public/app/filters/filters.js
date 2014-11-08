/**
 * Churn chrome extension 2014
 * A set of filters used throughout extension, like number filters
 **/

angular.module('churn.ext.filters', [])
	.filter('textNumber', [
	function(){
		// string splicer
		function strSplice(str, pos, added) {
		    return str.slice(0,pos) + added + str.slice(pos);
		}

		return function(number) {
			if(angular.isUndefined(number)){ return ''; }
			
			if(number < 1000){
				return number;
			}else{
				var dec, thousands;
				var numStr = number.toString();
				if(number < 10000){
					return strSplice(numStr, numStr.length - 3, ',');
				}else if(number < 100000){
					thousands = Math.floor(number / 1000);
					dec = Math.floor((number - (thousands*1000)) / 100);
					if(dec > 0){
						return thousands + '.' + dec + 'k';	
					}else{
						return thousands + 'k';
					}
				}else if(number < 1000000){
					thousands = Math.floor(number / 1000);
					return thousands + 'k';					
				}else{
					var millions = Math.floor(number / 1000000);
					dec = Math.floor((number - (millions*1000000)) / 10000);
					if(dec % 10 === 0){
						return millions + '.' + (dec % 10) + 'M';
					}else if(dec > 0){
						return millions + '.' + dec + 'M';
					}else{
						return millions + 'M';
					}
				}
			}
		};
	}]);