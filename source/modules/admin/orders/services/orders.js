/*orders service*/
(function(){
    angular.module('admin-orders').service('orders',orders);
    orders.$inject = ['$q', '$http'];
    function orders($q, $http){
        this.getOrders = function(){
            return $http({
                    method: 'POST',
                    url: '/tuiasmaragd/routes/getOrders.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.getOneOrder = function(param){
            return $http({
                    method: 'POST',
                    url: '/tuiasmaragd/routes/getOneOrder.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.updateOneOrder = function(param){
            return $http({
                    method: 'POST',
                    url: '/tuiasmaragd/routes/solvedOrder.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
    }
})();
