(function(){
    angular.module('admin-dashboard').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', '$interval'];
    function homeCtrl($scope, $interval){
        console.log('HOME >');
        $scope.statsBigChart = getAPIv4Chart1;
        console.log($scope.statsBigChart);

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

  // Simulate async data update
  $interval(function () {
    $scope.data = [
      [Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1, Math.floor(Math.random() * 100) + 1],
      [65, 59, 80, 81, 56, 55, 40]
    ];
  }, 3000);

    }
})();
