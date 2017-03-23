(function() {
    angular.module('admin-dashboard',[]).config(['$stateProvider', function($stateProvider){

        $stateProvider.state('admin.dashboard.home', {
                url: "/",
                ncyBreadcrumb: {
                    label: 'Main'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/dashboard/view/dashboard-home.html');
                },
                controller: 'homeCtrl',
                resolve: {
                //   getAPIv4Chart1: function($q, dashboard, ngNotify){
                //       return dashboard.getAPIv4Stats().then(function(result){
                //           return result;
                //       }).catch(function(error){
                //           var err = JSON.parse(error.data);
                //           ngNotify.set(err.error, {
                //               theme: 'pure',
                //               type: 'error',
                //               duration: 3000,
                //               button: true,
                //               html: true
                //           });
                //           return $q.reject(error);
                //       });
                //   }
                }
            });

    }]);
})();
