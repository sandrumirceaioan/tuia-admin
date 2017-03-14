(function(){
    angular.module('admin-messages').controller('messageCtrl', messageCtrl);
    messageCtrl.$inject = ['$scope', '$rootScope', 'ngNotify', 'messages', 'oneMsg'];
    function messageCtrl($scope, $rootScope, ngNotify, messages, oneMsg){

        	$scope.message = oneMsg;

        	$scope.replyMessage = function(data){
                if (data) {
                    data.type ='reply';
                } else {
                    data = {};
                    data.type ='update';
                }

                Object.assign(data, $scope.message);

        		messages.replyMessage(data).then(function(result){
                    $rootScope.newMessages--;
                    var scc = JSON.parse(result);
                    ngNotify.set(scc.success, {
                        theme: 'pure',
                        type: 'success',
                        duration: 3000,
                        button: true,
                        html: true
                    });
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
        	}
    }
})();
