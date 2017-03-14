(function() {

    angular.module('admin-container').controller('dashboardCtrl', dashboardCtrl);
    dashboardCtrl.$inject = ['$scope', '$state', '$rootScope', 'newOrd', 'newMsg'];
    function dashboardCtrl($scope, $state, $rootScope, newOrd, newMsg){

        $rootScope.newOrders = newOrd;
        $rootScope.newMessages = newMsg;

        $scope.collapse = stb(localStorage.getItem('menuColl')) || false;
        localStorage.setItem('menuColl', $scope.collapse);

        $scope.changeMenu = function(coll){
          $scope.collapse = !coll;
          localStorage.setItem('menuColl', $scope.collapse);
        }

        $scope.logout = function(){
            localStorage.clear();
            $rootScope.logged = {};
            $state.go('admin.login');
        };

        $scope.header = {
            title: "Tuia Smaragd Admin",
            description: "Tuia Smaragd Admin Dashboard",
            image: "admin_logo.png"
        };

        function stb(s) {
          if (s === 'true') return true;
          if (s === 'false') return false;
        }

    }

})();
