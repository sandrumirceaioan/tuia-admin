(function(){
    angular.module('admin-dashboard').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', '$interval', 'getAPIv4Chart1'];
    function homeCtrl($scope, $interval, getAPIv4Chart1){

        $scope.allData = getAPIv4Chart1.reports[0].data;
        $scope.users = $scope.allData.totals[0].values[0];
        $scope.views = $scope.allData.totals[0].values[1];
        $scope.duration = $scope.allData.totals[0].values[2] / 60;
        $scope.bounce = $scope.allData.totals[0].values[3];

        $scope.series = ['Users', 'Views'];

        $scope.labels = $scope.allData.rows.map(function(item){
          var date = item.dimensions[0].substring(0, 4) + '-' + item.dimensions[0].substring(4, 6) + '-' + item.dimensions[0].substring(6, 8);
          return date;
        });

        $scope.arr1 = $scope.allData.rows.map(function(item){
          var value = item.metrics[0].values[0];
          return value;
        });

        $scope.arr2 = $scope.allData.rows.map(function(item){
          var value = item.metrics[0].values[1];
          return value;
        });

          $scope.data = [$scope.arr1, $scope.arr2];

    }
})();
