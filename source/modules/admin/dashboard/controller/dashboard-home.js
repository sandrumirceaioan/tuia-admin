(function(){
    angular.module('admin-dashboard').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', 'getAPIv4Chart1'];
    function homeCtrl($scope, getAPIv4Chart1){
        console.log('HOME >');
        $scope.statsBigChart = getAPIv4Chart1;
        console.log($scope.statsBigChart);
    }
})();
