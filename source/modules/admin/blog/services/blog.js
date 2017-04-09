/*blog service*/
(function(){
    angular.module('admin-blog').service('blog',blog);
    blog.$inject = ['$q', '$http'];
    function blog($q, $http){
        this.getPosts = function(){
            return $http({
                    method: 'POST',
                    url: '../routes/getPosts.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.getOnePost = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/getOnePost.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.updateOnePost = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/updateOnePost.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.deletePostImage = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/deletePostImage.php',
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
                    url: '../routes/updatePostImageData.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
    }
})();
