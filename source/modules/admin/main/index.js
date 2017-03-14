/*admin view*/
(function(){
    angular.module('admin',[]).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin', {
                abstract:true,
                ncyBreadcrumb: {
                    label: 'Admin'
                },
                template: '<div class="admin-main"><div ui-view autoscroll="false"></div></div>'
            });
    }]);
})();

/*admin container*/
(function(){
    angular.module('admin-container',[]).config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('admin.dashboard', {
                url: "/dashboard",
                ncyBreadcrumb: {
                    label: 'Dashboard'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/main/view/dashboard.html');
                },
                controller: 'dashboardCtrl',
                resolve: {
                    checkUser: function(LogUser, $q, $rootScope, $state){
                        LogUser.loggedUser().then(function(result){
                            $rootScope.logged = result;
                        }).catch(function(error){
                            $state.go('admin.login');
                        });
                    },
                    newOrd: function($q, orders){
                        return orders.getNewOrdersCount().then(function(result){
                            return result.ord;
                        }).catch(function(error){
                            return $q.reject(error);
                        });
                    },
                    newMsg: function($q, messages){
                        return messages.getNewMessagesCount().then(function(result){
                            return result.msg;
                        }).catch(function(error){
                            return $q.reject(error);
                        });
                    }
                }
            });
    }]);
})();
