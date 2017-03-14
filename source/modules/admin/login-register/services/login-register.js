/*login service*/
(function(){
    angular.module('admin-login').service('LogUser',LogUser);
    LogUser.$inject = ['$q', '$http'];
    function LogUser($q, $http){
        this.loginUser = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/loginUser.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };

        this.loggedUser = function(){
            var token = localStorage.getItem('bToken');
            var toCheck = {pass:token};
                return $http({
                        method: 'POST',
                        url: '../routes/checkUser.php',
                        data: toCheck
                    }).then(function(result){
                        return result.data;
                    }).catch(function(error){
                        return $q.reject(error);
                    });
        };

    }
})();
