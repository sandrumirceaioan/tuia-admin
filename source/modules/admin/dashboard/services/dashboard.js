/*dashboard service*/
(function(){
    angular.module('admin-dashboard').service('dashboard',dashboard);
    dashboard.$inject = ['$q', '$http'];
    function dashboard($q, $http){
        this.getAPIv4Stats = function(){
            return $http({
                    method: 'POST',
                    url: '../routes/getDashboardStats.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
    }
})();
