(function(){
    angular.module('admin-orders').controller('orderCtrl', orderCtrl);
    orderCtrl.$inject = ['$scope', 'ngNotify', 'orders', 'oneOrd'];
    function orderCtrl($scope, ngNotify, orders, oneOrd){

        	$scope.tabContent = oneOrd;
        	$scope.currenttab = "Customer";

        	$scope.tabs = [
        		{title: "Customer"},
        		{title: "Order"	}
        	];

        	$scope.tabContents = [
        		{title: "Customer",content: "1"},
        		{title: "Order",content: "2"}
        	];

        	$scope.currentTab = function(tabName){
        		$scope.currenttab = tabName;
        	}

        	$scope.isActiveTab = function(tabName){
        		if (tabName == $scope.currenttab) return true;
        		return false;
        	}

        	$scope.upStatus = function(id){
        		orders.updateOneOrder({order:id}).then(function(result){
        			$scope.tabContent.osolved = '1';
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
    }
})();
