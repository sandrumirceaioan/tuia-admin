(function(){
angular.module('admin-products',[]).config(['$stateProvider', function($stateProvider){
    $stateProvider.state('admin.dashboard.products', {
      url: "/products",
      ncyBreadcrumb: {
          label: 'Products'
      },
      templateProvider: function($templateCache) {
          return $templateCache.get('modules/admin/products/view/products.html');
      },
      controller: 'productsCtrl',
      resolve: {
        getProds: function($q, $state, products, ngNotify){
            return products.getProducts().then(function(result){
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
    .state('admin.dashboard.product', {
            url: "/products/:productDetails",
            ncyBreadcrumb: {
                label: 'Product'
            },
            templateProvider: function($templateCache) {
                return $templateCache.get('modules/admin/products/view/product.html');
            },
            controller: 'productCtrl',
            resolve: {
              oneProd: function($q, $rootScope, $state, products, ngNotify, $stateParams){
                  return products.getOneProduct($stateParams).then(function(result){
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
