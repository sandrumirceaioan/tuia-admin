(function(){
    angular.module('admin-products').controller('productCtrl', productCtrl);
    productCtrl.$inject = ['$scope', '$rootScope', 'ngNotify', 'products', 'oneProd'];
    function productCtrl($scope, $rootScope, ngNotify, products, oneProd){

            if (oneProd.the_active == "1") oneProd.the_active = true;
            if (oneProd.the_active == "0") oneProd.the_active = false;
            if (oneProd.the_robots == "1") oneProd.the_robots = true;
            if (oneProd.the_robots == "0") oneProd.the_robots = false;

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
