/*dashboard service*/
(function(){
    angular.module('admin-dashboard').service('dashboard',dashboard);
    dashboard.$inject = ['$q', '$http'];
    function dashboard($q, $http){
        var data = null;
        this.getAPIv4Stats = function(){
            if (!data) {
                return $http({
                        method: 'POST',
                        url: '../routes/getDashboardStats.php'
                    }).then(function(result){
                        data = result.data;
                        return result.data;
                    }).catch(function(error){
                        return $q.reject(error);
                    });
            } else {
                return $q.resolve(data);
            }
        };
    }
})();
