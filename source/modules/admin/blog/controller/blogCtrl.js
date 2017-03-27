(function(){
    angular.module('admin-blog').controller('blogCtrl', blogCtrl);
    blogCtrl.$inject = ['$scope' ,'DTOptionsBuilder', 'DTColumnDefBuilder', 'getPosts'];
    function blogCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, getPosts){

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

        $scope.posts = getPosts;
        console.log('BLOG > posts');

    }
})();
