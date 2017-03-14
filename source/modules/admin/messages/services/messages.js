/*messages service*/
(function(){
    angular.module('admin-messages').service('messages',messages);
    messages.$inject = ['$q', '$http'];
    function messages($q, $http){
        this.getMessages = function(){
            return $http({
                    method: 'POST',
                    url: '../routes/getMessages.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.getOneMessage = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/getOneMessage.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.replyMessage = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/replyUpdateMessage.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.getNewMessagesCount = function(){
            return $http({
                    method: 'POST',
                    url: '../routes/getNewMessages.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
    }
})();
