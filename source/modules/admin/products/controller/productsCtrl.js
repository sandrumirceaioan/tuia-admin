(function(){
    angular.module('admin-products').controller('productsCtrl', productsCtrl);
    productsCtrl.$inject = ['$scope' ,'DTOptionsBuilder', 'DTColumnDefBuilder', 'getProds'];
    function productsCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, getProds){

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
    		DTColumnDefBuilder.newColumnDef(3).notSortable(),
    		DTColumnDefBuilder.newColumnDef(4),
    		DTColumnDefBuilder.newColumnDef(5),
    		DTColumnDefBuilder.newColumnDef(6),
    		DTColumnDefBuilder.newColumnDef(7),
        DTColumnDefBuilder.newColumnDef(8).notSortable()
      ];

      getProds = getProds.map(function(elem){
          elem.the_image = JSON.parse(elem.the_image);
          return elem;
      });

      $scope.products = getProds;


    }
})();
