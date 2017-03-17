(function(){
    angular.module('admin-products').controller('productCtrl', productCtrl);
    productCtrl.$inject = ['$scope', '$rootScope', 'ngNotify', 'products', 'oneProd', 'Lightbox', '$uibModal', '$document', 'FileUploader'];
    function productCtrl($scope, $rootScope, ngNotify, products, oneProd, Lightbox, $uibModal, $document, FileUploader){

            if (oneProd.the_active == "1") oneProd.the_active = true;
            if (oneProd.the_active == "0") oneProd.the_active = false;
            if (oneProd.the_robots == "1") oneProd.the_robots = true;
            if (oneProd.the_robots == "0") oneProd.the_robots = false;
            oneProd.the_oldprice = parseFloat(oneProd.the_oldprice);
            oneProd.the_newprice = parseFloat(oneProd.the_newprice);

            $scope.product = oneProd;
            $scope.Lightbox = Lightbox;

            var images = JSON.parse(oneProd.the_image);
            $scope.images = images.map(function(img){
                return {
                  url: '../images/products/' + img.image,
                  caption: img.alt,
                  thumbUrl: '../images/products/small/' + img.image,
                  file: img.image
                };
            });

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

                    images = images.filter(function(elem){
                       if (img !== elem.image) return elem;
                    });

                  products.deleteProductImage({id: parseInt(oneProd.the_id), file:img, arr:images}).then(function(result){
                        $scope.images.splice(index,1);
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

            console.log($scope.uploader);

            // upload image
            var uploader = $scope.uploader = new FileUploader({
                url: '../routes/uploadImage.php'
            });

            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                        console.info('onSuccessItem', fileItem, response, status, headers);
                    };

    }
})();
