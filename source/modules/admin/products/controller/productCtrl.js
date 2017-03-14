(function(){
    angular.module('admin-products').controller('productCtrl', productCtrl);
    productCtrl.$inject = ['$scope', '$rootScope', 'ngNotify', 'products', 'oneProd'];
    function productCtrl($scope, $rootScope, ngNotify, products, oneProd){

        	$scope.product = oneProd;

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
