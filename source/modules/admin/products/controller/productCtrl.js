(function(){
    angular.module('admin-products').controller('productCtrl', productCtrl);
    productCtrl.$inject = ['$scope', '$rootScope', 'ngNotify', 'products', 'oneProd', 'Lightbox', '$uibModal', '$document'];
    function productCtrl($scope, $rootScope, ngNotify, products, oneProd, Lightbox, $uibModal, $document){

            if (oneProd.the_active == "1") oneProd.the_active = true;
            if (oneProd.the_active == "0") oneProd.the_active = false;
            if (oneProd.the_robots == "1") oneProd.the_robots = true;
            if (oneProd.the_robots == "0") oneProd.the_robots = false;
            oneProd.the_oldprice = parseFloat(oneProd.the_oldprice);
            oneProd.the_newprice = parseFloat(oneProd.the_newprice);

            $scope.product = oneProd;
            $scope.Lightbox = Lightbox;

            var images = oneProd.the_image.split(",");
            $scope.images = images.map(function(img){
                var obj = {
                  url: '../images/products/' + img,
                  caption: img,
                  thumbUrl: '../images/products/small/' + img
                };
                return obj;
            });

            $scope.deleteImage = function(img){
              console.log('img: ',img);
              products.deleteProductImage(img).then(function(result){

                    console.log('controller result: ',result);

                          var scc = JSON.parse(result);
                          ngNotify.set(scc.success, {
                              theme: 'pure',
                              type: 'success',
                              duration: 3000,
                              button: true,
                              html: true
                          });
              }).catch(function(error){
                          var err = JSON.parse(error.data);
                          ngNotify.set(err.error, {
                              theme: 'pure',
                              type: 'error',
                              duration: 3000,
                              button: true,
                              html: true
                          });
              		});

            }
          console.log($scope.product);

        	// $scope.upStatus = function(id){
        	// 	orders.updateOneOrder({order:id}).then(function(result){
        	// 		$scope.tabContent.osolved = '1';
          //     $rootScope.newOrders--;
          //           var scc = JSON.parse(result);
          //           ngNotify.set(scc.success, {
          //               theme: 'pure',
          //               type: 'success',
          //               duration: 3000,
          //               button: true,
          //               html: true
          //           });
        	// 	}).catch(function(error){
          //           var err = JSON.parse(error.data);
          //           ngNotify.set(err.error, {
          //               theme: 'pure',
          //               type: 'error',
          //               duration: 3000,
          //               button: true,
          //               html: true
          //           });
        	// 	});
        	// }
    }
})();
