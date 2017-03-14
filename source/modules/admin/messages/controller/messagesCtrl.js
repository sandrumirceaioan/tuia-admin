(function(){
    angular.module('admin-messages').controller('messagesCtrl', messagesCtrl);
    messagesCtrl.$inject = ['$scope' ,'DTOptionsBuilder', 'DTColumnDefBuilder', 'getMsg'];
    function messagesCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, getMsg){

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
          return my.query({
            entryQty: 500
          }).$promise;
        })
      .withPaginationType('full_numbers')
      .withOption('bLengthChange', true)
      .withOption('bFilter', true)
      .withDisplayLength(100)
      .withOption('order', [0, 'desc'])
      .withOption('stateSave', true)
      .withBootstrap();

      $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
		    DTColumnDefBuilder.newColumnDef(2),
    		DTColumnDefBuilder.newColumnDef(3),
    		DTColumnDefBuilder.newColumnDef(4),
    		DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6).notSortable()
      ];

      $scope.messages = getMsg;

    }
})();
