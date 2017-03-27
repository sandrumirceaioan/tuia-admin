(function(){
'use strict';

angular.module('tuia', [
	'ui.bootstrap',
  'datatables',
  'datatables.bootstrap',
 	'ui.router',
	'templates-main',
	'ngNotify',
	'ncy-angular-breadcrumb',
	'ngSanitize',
	'angular-md5',
  'bootstrapLightbox',
	'angularFileUpload',
	'daterangepicker',
  'chart.js',
    'admin',
    'admin-container',
    'admin-dashboard',
    'admin-login',
    'admin-orders',
		'admin-messages',
		'admin-products',
		'admin-blog'
	])
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', 'LightboxProvider', 'ChartJsProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, LightboxProvider, ChartJsProvider) {

		$locationProvider.hashPrefix('');
		$urlRouterProvider.otherwise('/login');
		$locationProvider.html5Mode(false);

    ChartJsProvider.setOptions({
      responsive: true
    });
    ChartJsProvider.setOptions('line', {
      showLines: true
    });

}]);

// .run(function($state, $rootScope){
// 	$rootScope.$on('$stateChangeStart',
// 	function(event, toState, toParams, fromState, fromParams){
// 		$rootScope.currentState =toState.name;
//         console.log($rootScope.currentState);
// 	});
// })

})();

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
    });
    /*
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
        });*/

}]);
})();

(function() {
    angular.module('admin-dashboard',[]).config(['$stateProvider', function($stateProvider){

        $stateProvider.state('admin.dashboard.home', {
                url: "/",
                ncyBreadcrumb: {
                    label: 'Main'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/dashboard/view/dashboard-home.html');
                },
                controller: 'homeCtrl',
                resolve: {
                //   getAPIv4Chart1: function($q, dashboard, ngNotify){
                //       var initialDates = {startDate: moment().subtract(7,'d').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD')};
                //       return dashboard.getAPIv4Stats(initialDates, false).then(function(result){
                //           return result;
                //       }).catch(function(error){
                //           var err = JSON.parse(error.data);
                //           ngNotify.set(err.error, {
                //               theme: 'pure',
                //               type: 'error',
                //               duration: 3000,
                //               button: true,
                //               html: true
                //           });
                //           return $q.reject(error);
                //       });
                //   }
                }
            });

    }]);
})();

(function(){
    angular.module('admin-login',[]).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin.login', {
                url: "/login",
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/login-register/view/login.html');
                },
                controller: 'loginCtrl',
                resolve: {
                    checklogged: function($rootScope, $state, LogUser){
                        LogUser.loggedUser().then(function(result){
                            $rootScope.logged = result;
                            console.log('login-index result:', result);
                            $state.go('admin.dashboard.home');
                        }).catch(function(error){
                            $state.go('admin.login');
                        });
                    }
                }
            });
    }]);
})();

/*admin view*/
(function(){
    angular.module('admin',[]).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('admin', {
                abstract:true,
                ncyBreadcrumb: {
                    label: 'Admin'
                },
                template: '<div class="admin-main"><div ui-view autoscroll="false"></div></div>'
            });
    }]);
})();

/*admin container*/
(function(){
    angular.module('admin-container',[]).config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('admin.dashboard', {
                url: "/dashboard",
                ncyBreadcrumb: {
                    label: 'Dashboard'
                },
                templateProvider: function($templateCache) {
                    return $templateCache.get('modules/admin/main/view/dashboard.html');
                },
                controller: 'dashboardCtrl',
                resolve: {
                    checkUser: function(LogUser, $q, $rootScope, $state){
                        LogUser.loggedUser().then(function(result){
                            $rootScope.logged = result;
                        }).catch(function(error){
                            $state.go('admin.login');
                        });
                    },
                    newOrd: function($q, orders){
                        return orders.getNewOrdersCount().then(function(result){
                            return result.ord;
                        }).catch(function(error){
                            return $q.reject(error);
                        });
                    },
                    newMsg: function($q, messages){
                        return messages.getNewMessagesCount().then(function(result){
                            return result.msg;
                        }).catch(function(error){
                            return $q.reject(error);
                        });
                    }
                }
            });
    }]);
})();

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

(function(){
angular.module('admin-orders', []).config(['$stateProvider', function($stateProvider){

  $stateProvider.state('admin.dashboard.orders', {
          url: "/orders",
          ncyBreadcrumb: {
              label: 'Orders'
          },
          templateProvider: function($templateCache) {
              return $templateCache.get('modules/admin/orders/view/orders.html');
          },
          controller: 'ordersCtrl',
          resolve: {
            getOrd: function($q, $rootScope, $state, orders, ngNotify){
                return orders.getOrders().then(function(result){
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
      .state('admin.dashboard.order', {
              url: "/orders/:orderDetails",
              ncyBreadcrumb: {
                  label: 'Order'
              },
              templateProvider: function($templateCache) {
                  return $templateCache.get('modules/admin/orders/view/order.html');
              },
              controller: 'orderCtrl',
              resolve: {
                oneOrd: function($q, $rootScope, $state, orders, ngNotify, $stateParams){
                    return orders.getOneOrder($stateParams).then(function(result){
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

(function(){
angular.module('admin-products',[]).config(['$stateProvider', function($stateProvider){
    $stateProvider.state('admin.dashboard.products', {
      url: "/products",
      ncyBreadcrumb: {
          label: 'Products'
      },
      templateProvider: function($templateCache) {
          return $templateCache.get('modules/admin/products/view/products.html');
      },
      controller: 'productsCtrl',
      resolve: {
        getProds: function($q, $state, products, ngNotify){
            return products.getProducts().then(function(result){
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
    .state('admin.dashboard.product', {
            url: "/products/:productDetails",
            ncyBreadcrumb: {
                label: 'Product'
            },
            templateProvider: function($templateCache) {
                return $templateCache.get('modules/admin/products/view/product.html');
            },
            controller: 'productCtrl',
            resolve: {
              oneProd: function($q, $rootScope, $state, products, ngNotify, $stateParams){
                  return products.getOneProduct($stateParams).then(function(result){
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

(function(){
    angular.module('admin-blog').controller('blogCtrl', blogCtrl);
    blogCtrl.$inject = ['$scope' ,'DTOptionsBuilder', 'DTColumnDefBuilder', 'getPosts'];
    function blogCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, getPosts){

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
          return my.query({
            entryQty: 500
          }).$promise;
        })
      .withPaginationType('full_numbers')
      .withOption('bLengthChange', true)
      .withOption('bFilter', true)
      .withDisplayLength(100)
      .withOption('order', [0, 'desc'])
      .withOption('stateSave', true)
      .withBootstrap();

      $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6).notSortable()
      ];

        $scope.posts = getPosts;
        console.log('BLOG > posts');

    }
})();

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

(function(){
    angular.module('admin-dashboard').controller('homeCtrl', homeCtrl);
    homeCtrl.$inject = ['$scope', '$interval', 'dashboard', 'getAPIv4Chart1'];
    function homeCtrl($scope, $interval, dashboard, getAPIv4Chart1){

        $scope.date = {
          startDate: moment().subtract(7,'d').format('YYYY-MM-DD'),
          endDate: moment().format("YYYY-MM-DD")
        };
        $scope.date.current = moment().format("YYYY-MM-DD");

        $scope.opts = {
          timePicker: false,
          eventHandlers: {
            'apply.daterangepicker': function (ev, picker) {
                if ($scope.date.startDate._d && $scope.date.endDate._d) {
                    $scope.date = {
                        startDate: moment($scope.date.startDate._d).format('YYYY-MM-DD'),
                        endDate: moment($scope.date.endDate._d).format('YYYY-MM-DD'),
                        current: moment().format("YYYY-MM-DD")
                    };
                }

                dashboard.getAPIv4Stats($scope.date, true).then(function(result){

                    $scope.allData = result.reports[0].data;
                    $scope.users = $scope.allData.totals[0].values[0];
                    $scope.views = $scope.allData.totals[0].values[1];
                    $scope.duration = $scope.allData.totals[0].values[2] / 60;
                    $scope.bounce = $scope.allData.totals[0].values[3];

                    $scope.labels = $scope.allData.rows.map(function(item){
                      var date = item.dimensions[0].substring(0, 4) + '-' + item.dimensions[0].substring(4, 6) + '-' + item.dimensions[0].substring(6, 8);
                      return date;
                    });
                    $scope.arr1 = $scope.allData.rows.map(function(item){
                      var value = item.metrics[0].values[0];
                      return value;
                    });
                    $scope.arr2 = $scope.allData.rows.map(function(item){
                      var value = item.metrics[0].values[1];
                      return value;
                    });
                    $scope.data = [$scope.arr1, $scope.arr2];

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
        };

        $scope.allData = getAPIv4Chart1.reports[0].data;
        $scope.users = $scope.allData.totals[0].values[0];
        $scope.views = $scope.allData.totals[0].values[1];
        $scope.duration = $scope.allData.totals[0].values[2] / 60;
        $scope.bounce = $scope.allData.totals[0].values[3];

        $scope.series = ['Users', 'Views'];
        $scope.labels = $scope.allData.rows.map(function(item){
          var date = item.dimensions[0].substring(0, 4) + '-' + item.dimensions[0].substring(4, 6) + '-' + item.dimensions[0].substring(6, 8);
          return date;
        });
        $scope.arr1 = $scope.allData.rows.map(function(item){
          var value = item.metrics[0].values[0];
          return value;
        });
        $scope.arr2 = $scope.allData.rows.map(function(item){
          var value = item.metrics[0].values[1];
          return value;
        });
        $scope.data = [$scope.arr1, $scope.arr2];

    }
})();

/*dashboard service*/
(function(){
    angular.module('admin-dashboard').service('dashboard',dashboard);
    dashboard.$inject = ['$q', '$http'];
    function dashboard($q, $http){
        var data = null;
        this.getAPIv4Stats = function(param, update){
            if (!data || update) {
                return $http({
                        method: 'POST',
                        url: '../routes/getDashboardStats.php',
                        data: param
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

(function(){
        angular.module('admin-container').directive('adminSidebar', function(){
        return {
            restrict: 'E',
            templateUrl: 'modules/admin/main/view/admin-sidebar.html',
            controller: function(){
            }
        };
    });
})();

(function() {

    angular.module('admin-container').controller('dashboardCtrl', dashboardCtrl);
    dashboardCtrl.$inject = ['$scope', '$state', '$rootScope', 'newOrd', 'newMsg'];
    function dashboardCtrl($scope, $state, $rootScope, newOrd, newMsg){

        $rootScope.newOrders = newOrd;
        $rootScope.newMessages = newMsg;

        $scope.collapse = stb(localStorage.getItem('menuColl')) || false;
        localStorage.setItem('menuColl', $scope.collapse);

        $scope.changeMenu = function(coll){
          $scope.collapse = !coll;
          localStorage.setItem('menuColl', $scope.collapse);
        }

        $scope.logout = function(){
            localStorage.clear();
            $rootScope.logged = {};
            $state.go('admin.login');
        };

        $scope.header = {
            title: "Tuia Smaragd Admin",
            description: "Tuia Smaragd Admin Dashboard",
            image: "admin_logo.png"
        };

        function stb(s) {
          if (s === 'true') return true;
          if (s === 'false') return false;
        }

    }

})();

(function(){

})();

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

(function(){
    angular.module('admin-messages').controller('messagesCtrl', messagesCtrl);
    messagesCtrl.$inject = ['$scope' ,'DTOptionsBuilder', 'DTColumnDefBuilder', 'getMsg'];
    function messagesCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, getMsg){

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
          return my.query({
            entryQty: 500
          }).$promise;
        })
      .withPaginationType('full_numbers')
      .withOption('bLengthChange', true)
      .withOption('bFilter', true)
      .withDisplayLength(100)
      .withOption('order', [0, 'desc'])
      .withOption('stateSave', true)
      .withBootstrap();

      $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
		    DTColumnDefBuilder.newColumnDef(2),
    		DTColumnDefBuilder.newColumnDef(3),
    		DTColumnDefBuilder.newColumnDef(4),
    		DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6).notSortable()
      ];

      $scope.messages = getMsg;

    }
})();

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

(function(){
    angular.module('admin-orders').controller('orderCtrl', orderCtrl);
    orderCtrl.$inject = ['$scope', '$rootScope', 'ngNotify', 'orders', 'oneOrd'];
    function orderCtrl($scope, $rootScope, ngNotify, orders, oneOrd){

        	$scope.tabContent = oneOrd;
        	$scope.currenttab = "Customer";

        	$scope.tabs = [
        		{title: "Customer"},
        		{title: "Order"	}
        	];

        	$scope.tabContents = [
        		{title: "Customer",content: "1"},
        		{title: "Order",content: "2"}
        	];

        	$scope.currentTab = function(tabName){
        		$scope.currenttab = tabName;
        	}

        	$scope.isActiveTab = function(tabName){
        		if (tabName == $scope.currenttab) return true;
        		return false;
        	}

        	$scope.upStatus = function(id){
        		orders.updateOneOrder({order:id}).then(function(result){
        			$scope.tabContent.osolved = '1';
              $rootScope.newOrders--;
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

(function(){
    angular.module('admin-orders').controller('ordersCtrl', ordersCtrl);
    ordersCtrl.$inject = ['$scope' ,'DTOptionsBuilder', 'DTColumnDefBuilder', 'getOrd'];
    function ordersCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, getOrd){

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
          return my.query({
            entryQty: 500
          }).$promise;
        })
      .withPaginationType('full_numbers')
      .withOption('bLengthChange', true)
      .withOption('bFilter', true)
      .withDisplayLength(100)
      .withOption('order', [0, 'desc'])
      .withOption('stateSave', true)
      .withBootstrap();

      $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
		    DTColumnDefBuilder.newColumnDef(2),
    		DTColumnDefBuilder.newColumnDef(3),
    		DTColumnDefBuilder.newColumnDef(4),
    		DTColumnDefBuilder.newColumnDef(5),
    		DTColumnDefBuilder.newColumnDef(6),
    		DTColumnDefBuilder.newColumnDef(7).notSortable()
      ];

      $scope.orders = getOrd;

    }
})();

/*orders service*/
(function(){
    angular.module('admin-orders').service('orders',orders);
    orders.$inject = ['$q', '$http'];
    function orders($q, $http){
        this.getOrders = function(){
            return $http({
                    method: 'POST',
                    url: '../routes/getOrders.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.getOneOrder = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/getOneOrder.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.updateOneOrder = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/solvedOrder.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.getNewOrdersCount = function(){
            return $http({
                    method: 'POST',
                    url: '../routes/getNewOrders.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
    }
})();

(function(){
angular.module('admin-products').directive('ngThumb', ['$window', function($window) {
        var helper = {
            support: !!($window.FileReader && $window.CanvasRenderingContext2D),
            isFile: function(item) {
                return angular.isObject(item) && item instanceof $window.File;
            },
            isImage: function(file) {
                var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        };

        return {
            restrict: 'A',
            template: '<canvas/>',
            link: function(scope, element, attributes) {
                if (!helper.support) return;

                var params = scope.$eval(attributes.ngThumb);

                if (!helper.isFile(params.file)) return;
                if (!helper.isImage(params.file)) return;

                var canvas = element.find('canvas');
                var reader = new FileReader();

                reader.onload = onLoadFile;
                reader.readAsDataURL(params.file);

                function onLoadFile(event) {
                    var img = new Image();
                    img.onload = onLoadImage;
                    img.src = event.target.result;
                }

                function onLoadImage() {
                    var width = params.width || this.width / this.height * params.height;
                    var height = params.height || this.height / this.width * params.width;
                    canvas.attr({ width: width, height: height });
                    canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
                }
            }
        };
    }]);
})();

(function(){
    angular.module('admin-products').controller('productCtrl', productCtrl);
    productCtrl.$inject = ['$scope', '$rootScope', 'ngNotify', 'products', 'oneProd', 'Lightbox', '$uibModal', '$document', 'FileUploader', '$state'];
    function productCtrl($scope, $rootScope, ngNotify, products, oneProd, Lightbox, $uibModal, $document, FileUploader, $state){

            if (oneProd.the_active == "1") oneProd.the_active = true;
            if (oneProd.the_active == "0") oneProd.the_active = false;
            if (oneProd.the_robots == "1") oneProd.the_robots = true;
            if (oneProd.the_robots == "0") oneProd.the_robots = false;
            oneProd.the_oldprice = parseFloat(oneProd.the_oldprice);
            oneProd.the_newprice = parseFloat(oneProd.the_newprice);

            $scope.product = oneProd;
            console.log('$scope.product:',$scope.product);
            $scope.Lightbox = Lightbox;

            $scope.initialImages = JSON.parse(oneProd.the_image);
            $scope.images = $scope.initialImages.map(function(img){
                return {
                  url: '../images/products/' + img.image,
                  caption: img.alt,
                  thumbUrl: '../images/products/small/' + img.image,
                  file: img.image
                };
            });

            /* update product info*/
            $scope.updateProductInfo = function(product){

                var toSave = {
                    id: parseInt(oneProd.the_id),
                    the_title: product.the_title,
                    the_url: product.the_url,
                    the_shortdescription: product.the_shortdescription,
                    the_active: (product.the_active == true) ? 1 : 0,
                    the_robots: (product.the_robots == true) ? 1 : 0,
                    the_description: product.the_description,
                    the_oldprice: parseFloat(product.the_oldprice),
                    the_newprice: parseFloat(product.the_newprice)
                }

                console.log(toSave);

                products.updateOneProduct(toSave).then(function(result){
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


            /* delete image */
            $scope.deleteImage = function(img,index){

                    if ($scope.images.length === 1) {
                        ngNotify.set('Cannot delete last image!', {
                            theme: 'pure',
                            type: 'error',
                            duration: 3000,
                            button: true,
                            html: true
                        });
                        return;
                    };

                    $scope.initialImages = $scope.initialImages.filter(function(elem){
                       if (img !== elem.image) return elem;
                    });

                  products.deleteProductImage({id: parseInt(oneProd.the_id), file:img, arr: $scope.initialImages}).then(function(result){
                          var scc = JSON.parse(result);
                          ngNotify.set(scc.success, {
                              theme: 'pure',
                              type: 'success',
                              duration: 3000,
                              button: true,
                              html: true
                          });
                          $state.reload();
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

            /* upload image */
            var uploader = $scope.uploader = new FileUploader({
                url: '../routes/uploadImage.php'
            });

            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                var imgAlt = fileItem.file.name.split(".");
                $scope.initialImages.push({
                    alt: imgAlt[0],
                    image: fileItem.file.name,
                    order: 999
                });
            };

            uploader.onCompleteAll = function() {
                products.updateImageData({images: $scope.initialImages, id: parseInt(oneProd.the_id)}).then(function(result){
                    var scc = JSON.parse(result);
                    ngNotify.set(scc.success, {
                        theme: 'pure',
                        type: 'success',
                        duration: 3000,
                        button: true,
                        html: true
                    });
                    $state.reload();
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

(function(){
    angular.module('admin-products').controller('productsCtrl', productsCtrl);
    productsCtrl.$inject = ['$scope' ,'DTOptionsBuilder', 'DTColumnDefBuilder', 'getProds'];
    function productsCtrl($scope, DTOptionsBuilder, DTColumnDefBuilder, getProds){

        $scope.dtOptions = DTOptionsBuilder.fromFnPromise(function () {
          return my.query({
            entryQty: 500
          }).$promise;
        })
      .withPaginationType('full_numbers')
      .withOption('bLengthChange', true)
      .withOption('bFilter', true)
      .withDisplayLength(100)
      .withOption('order', [0, 'desc'])
      .withOption('stateSave', true)
      .withBootstrap();

      $scope.dtColumnDefs = [
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
		    DTColumnDefBuilder.newColumnDef(2),
    		DTColumnDefBuilder.newColumnDef(3).notSortable(),
    		DTColumnDefBuilder.newColumnDef(4),
    		DTColumnDefBuilder.newColumnDef(5),
    		DTColumnDefBuilder.newColumnDef(6),
    		DTColumnDefBuilder.newColumnDef(7),
        DTColumnDefBuilder.newColumnDef(8).notSortable()
      ];

      getProds = getProds.map(function(elem){
          elem.the_image = JSON.parse(elem.the_image);
          return elem;
      });

      $scope.products = getProds;


    }
})();

/*products service*/
(function(){
    angular.module('admin-products').service('products',products);
    products.$inject = ['$q', '$http'];
    function products($q, $http){
        this.getProducts = function(){
            return $http({
                    method: 'POST',
                    url: '../routes/getProducts.php'
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.getOneProduct = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/getOneProduct.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        this.updateOneProduct = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/updateOneProduct.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
        // this.getNewOrdersCount = function(){
        //     return $http({
        //             method: 'POST',
        //             url: '../routes/getNewOrders.php'
        //         }).then(function(result){
        //             return result.data;
        //         }).catch(function(error){
        //             return $q.reject(error);
        //         });
        // };
        this.deleteProductImage = function(param){
            return $http({
                    method: 'POST',
                    url: '../routes/deleteProductImage.php',
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
                    url: '../routes/updateProductImageData.php',
                    data: param
                }).then(function(result){
                    return result.data;
                }).catch(function(error){
                    return $q.reject(error);
                });
        };
    }
})();
