(function() {

    angular.module('admin-login').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$scope', 'LogUser', 'ngNotify', '$state', '$rootScope'];
    function loginCtrl($scope, LogUser, ngNotify, $state, $rootScope) {

        $scope.login = function(user){

            LogUser.loginUser(user).then(function(result){

                    $rootScope.logged = result;
                    localStorage.setItem('bToken', $rootScope.logged.password);
                    localStorage.setItem('logged', JSON.stringify($rootScope.logged));

                    ngNotify.set('Welcome <b>' + $rootScope.logged.username + '</b> !', {
                        theme: 'pure',
                        type: 'success',
                        duration: 3000,
                        button: true,
                        html: true
                    });
                    $state.go('admin.dashboard.home');

            }).catch(function(error){
                var err = JSON.parse(error.data);
                ngNotify.set(err.error, {
                    theme: 'pure',
                    type: 'error',
                    duration: 3000,
                    button: true,
                    html: true
                });
            });

        };

    }

})();
