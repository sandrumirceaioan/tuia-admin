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
            getOrd: function($q, $rootScope, $state, orders, ngNotify){
                return orders.getOrders().then(function(result){
                    return result;
                }).catch(function(error){
                    var err = JSON.parse(error.data);
                    ngNotify.set(err.error, {
                        theme: 'pure',
                        type: 'error',
                        duration: 3000,
                        button: true,
                        html: true
                    });
                    return $q.reject(error);
                });
            }
          }
      })
      .state('admin.dashboard.order', {
              url: "/orders/:orderDetails",
              ncyBreadcrumb: {
                  label: 'Order'
              },
              templateProvider: function($templateCache) {
                  return $templateCache.get('modules/admin/orders/view/order.html');
              },
              controller: 'orderCtrl',
              resolve: {
                oneOrd: function($q, $rootScope, $state, orders, ngNotify, $stateParams){
                    return orders.getOneOrder($stateParams).then(function(result){
                        return result;
                    }).catch(function(error){
                        var err = JSON.parse(error.data);
                        ngNotify.set(err.error, {
                            theme: 'pure',
                            type: 'error',
                            duration: 3000,
                            button: true,
                            html: true
                        });
                        return $q.reject(error);
                    });
                }
              }
          });
}]);
})();
