(function(){
    angular.module('admin-blog').controller('postCtrl', postCtrl);
    postCtrl.$inject = ['$scope', '$state', '$rootScope', 'ngNotify', 'blog', 'onePost', 'Lightbox', '$uibModal', '$document', 'FileUploader'];
    function postCtrl($scope, $state, $rootScope, ngNotify, blog, onePost, Lightbox, $uibModal, $document, FileUploader){

            $scope.createUrl = function(title){
                var str = title && title.trim().replace(/\s+/g,'-') || '';
                $scope.post.the_url = str.toLowerCase();
            };

            if (onePost.the_active == "1") onePost.the_active = true;
            if (onePost.the_active == "0") onePost.the_active = false;
            if (onePost.the_robots == "1") onePost.the_robots = true;
            if (onePost.the_robots == "0") onePost.the_robots = false;

            onePost.the_metakeywords = JSON.parse(onePost.the_metakeywords);

            $scope.post = onePost;

            console.log('$scope.blog:',$scope.post);
            $scope.Lightbox = Lightbox;

            $scope.initialImages = JSON.parse(onePost.the_image);
            $scope.images = $scope.initialImages.map(function(img){
                return {
                  url: '../images/blog/' + img.image,
                  caption: img.alt,
                  thumbUrl: '../images/blog/small/' + img.image,
                  file: img.image
                };
            });

            /* update post info*/
            $scope.savePost = function(post){

                var toSave = {
                    id: parseInt(onePost.the_id),
                    the_title: post.the_title,
                    the_url: post.the_url,
                    the_order: post.the_order,
                    the_shortdescription: post.the_shortdescription,
                    the_metadescription: post.the_shortdescription,
                    the_metakeywords: post.the_metakeywords,
                    the_active: (post.the_active == true) ? 1 : 0,
                    the_robots: (post.the_robots == true) ? 1 : 0,
                    the_description: post.the_description
                }

                blog.updateOnePost(toSave).then(function(result){
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

                  blog.deletePostImage({id: parseInt(onePost.the_id), file:img, arr: $scope.initialImages}).then(function(result){
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
                url: '../routes/uploadPostImage.php'
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
                blog.updateImageData({images: $scope.initialImages, id: parseInt(onePost.the_id)}).then(function(result){
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
