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
        // this.getOneMessage = function(param){
        //     return $http({
        //             method: 'POST',
        //             url: '../routes/getOneMessage.php',
        //             data: param
        //         }).then(function(result){
        //             return result.data;
        //         }).catch(function(error){
        //             return $q.reject(error);
        //         });
        // };
        // this.replyMessage = function(param){
        //     return $http({
        //             method: 'POST',
        //             url: '../routes/replyUpdateMessage.php',
        //             data: param
        //         }).then(function(result){
        //             return result.data;
        //         }).catch(function(error){
        //             return $q.reject(error);
        //         });
        // };
        // this.getNewMessagesCount = function(){
        //     return $http({
        //             method: 'POST',
        //             url: '../routes/getNewMessages.php'
        //         }).then(function(result){
        //             return result.data;
        //         }).catch(function(error){
        //             return $q.reject(error);
        //         });
        // };
    }
})();
