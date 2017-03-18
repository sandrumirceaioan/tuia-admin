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
