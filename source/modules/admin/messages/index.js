(function(){
angular.module('admin-messages',[]).config(['$stateProvider', function($stateProvider){

    $stateProvider.state('admin.dashboard.messages', {
        url: '/messages',
        ncyBreadcrumb: {
            label: 'Messages'
        },
        templateProvider: function($templateCache){
            return $templateCache.get('modules/admin/messages/view/messages.html');
        },
        controller: 'messagesCtrl',
        resolve: {
          getMsg: function($q, messages, ngNotify){
              return messages.getMessages().then(function(result){
                  return result;
              }).catch(function(error){
                  var err = JSON.parse(error.data);
                  ngNotify.set(err.error, {
                      theme: 'pure',
                      type: 'error',
                      duration: 3000,
                      button: true,
                      html: true
                  });
                  return $q.reject(error);
              });
          }
        }
    })
    .state('admin.dashboard.message', {
            url: "/messages/:messageDetails",
            ncyBreadcrumb: {
                label: 'Message'
            },
            templateProvider: function($templateCache) {
                return $templateCache.get('modules/admin/messages/view/message.html');
            },
            controller: 'messageCtrl',
            resolve: {
              oneMsg: function($q, $rootScope, $state, messages, ngNotify, $stateParams){
                  return messages.getOneMessage($stateParams).then(function(result){
                      return result;
                  }).catch(function(error){
                      var err = JSON.parse(error.data);
                      ngNotify.set(err.error, {
                          theme: 'pure',
                          type: 'error',
                          duration: 3000,
                          button: true,
                          html: true
                      });
                      return $q.reject(error);
                  });
              }
            }
        });

}]);
})();
