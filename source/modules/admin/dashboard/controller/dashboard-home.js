(function(){
    angular.module('admin-dashboard').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', '$interval', 'dashboard', 'getAPIv4Chart1'];
    function homeCtrl($scope, $interval, dashboard, getAPIv4Chart1){

        $scope.date = {
          startDate: moment().subtract(7,'d').format('YYYY-MM-DD'),
          endDate: moment().format("YYYY-MM-DD")
        };
        $scope.date.current = moment().format("YYYY-MM-DD");

        $scope.opts = {
          timePicker: false,
          eventHandlers: {
            'apply.daterangepicker': function (ev, picker) {
                if ($scope.date.startDate._d && $scope.date.endDate._d) {
                    $scope.date = {
                        startDate: moment($scope.date.startDate._d).format('YYYY-MM-DD'),
                        endDate: moment($scope.date.endDate._d).format('YYYY-MM-DD'),
                        current: moment().format("YYYY-MM-DD")
                    };
                }

                dashboard.getAPIv4Stats($scope.date, true).then(function(result){

                    $scope.allData = result.reports[0].data;
                    $scope.users = $scope.allData.totals[0].values[0];
                    $scope.views = $scope.allData.totals[0].values[1];
                    $scope.duration = $scope.allData.totals[0].values[2] / 60;
                    $scope.bounce = $scope.allData.totals[0].values[3];

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
        };

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
