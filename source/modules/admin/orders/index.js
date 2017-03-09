(function(){
angular.module('admin-orders', []).config(['$stateProvider', function($stateProvider){

  $stateProvider.state('admin.dashboard.orders', {
          url: "/orders",
          ncyBreadcrumb: {
              label: 'Orders'
          },
          templateProvider: function($templateCache) {
              return $templateCache.get('modules/admin/orders/view/orders.html');
          },
          controller: 'ordersCtrl',
          resolve: {
            getOrd: function($rootScope, $state, orders){
                return orders.getOrders().then(function(result){
                  console.log('resolve result: ', result);
                    return result;
                }).catch(function(error){
                    $q.reject(error);
                });
            }
          }
      });

}]);

})();
