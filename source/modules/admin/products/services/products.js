/*products service*/
(function(){
    angular.module('admin-products').service('products',products);
    products.$inject = ['$q', '$http'];
    function products($q, $http){
        this.getProducts = function(){
            return $http({
                    method: 'POST',
                    url: '../routes/getProducts.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.getOneProduct = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/getOneProduct.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.updateOneProduct = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/updateOneProduct.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        // this.getNewOrdersCount = function(){
        //     return $http({
        //             method: 'POST',
        //             url: '../routes/getNewOrders.php'
        //         }).then(function(result){
        //             return result.data;
        //         }).catch(function(error){
        //             return $q.reject(error);
        //         });
        // };
        this.deleteProductImage = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/deleteProductImage.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.updateImageData = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/updateProductImageData.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
    }
})();
