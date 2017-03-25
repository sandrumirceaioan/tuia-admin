(function(){
'use strict';

angular.module('tuia', [
	'ui.bootstrap',
  'datatables',
  'datatables.bootstrap',
 	'ui.router',
	'templates-main',
	'ngNotify',
	'ncy-angular-breadcrumb',
	'ngSanitize',
	'angular-md5',
  'bootstrapLightbox',
	'angularFileUpload',
	'daterangepicker',
  'chart.js',
    'admin',
    'admin-container',
    'admin-dashboard',
    'admin-login',
    'admin-orders',
		'admin-messages',
		'admin-products'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', 'LightboxProvider', 'ChartJsProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, LightboxProvider, ChartJsProvider) {

		$locationProvider.hashPrefix('');
		$urlRouterProvider.otherwise('/login');
		$locationProvider.html5Mode(false);

    ChartJsProvider.setOptions({
      responsive: true
    });
    ChartJsProvider.setOptions('line', {
      showLines: true
    });

}]);

// .run(function($state, $rootScope){
// 	$rootScope.$on('$stateChangeStart',
// 	function(event, toState, toParams, fromState, fromParams){
// 		$rootScope.currentState =toState.name;
//         console.log($rootScope.currentState);
// 	});
// })

})();
