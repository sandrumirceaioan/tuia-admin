(function(){
angular.module('admin-blog',[]).config(['$stateProvider', function($stateProvider){

    $stateProvider.state('admin.dashboard.posts', {
        url: '/blog',
        ncyBreadcrumb: {
            label: 'Blog'
        },
        templateProvider: function($templateCache){
            return $templateCache.get('modules/admin/blog/view/blog.html');
        },
        controller: 'blogCtrl',
        resolve: {
          getPosts: function($q, blog, ngNotify){
              return blog.getPosts().then(function(result){
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

    .state('admin.dashboard.post', {
            url: "/post/:postDetails",
            ncyBreadcrumb: {
                label: 'Post'
            },
            templateProvider: function($templateCache) {
                return $templateCache.get('modules/admin/blog/view/post.html');
            },
            controller: 'postCtrl',
            resolve: {
              onePost: function($q, blog, $rootScope, $state, ngNotify, $stateParams){
                  return blog.getOnePost($stateParams).then(function(result){
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
