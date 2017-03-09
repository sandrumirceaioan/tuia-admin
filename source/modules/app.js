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
    'admin',
    'admin-container',
    'admin-dashboard',
    'admin-login',
    'admin-orders'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

		$locationProvider.hashPrefix('');
		$urlRouterProvider.otherwise('/login');
		$locationProvider.html5Mode(false);

}])

.run(function($state, $rootScope){
	$rootScope.$on('$stateChangeStart',
	function(event, toState, toParams, fromState, fromParams){
		$rootScope.currentState =toState.name;
        console.log($rootScope.currentState);
	});
})

})();