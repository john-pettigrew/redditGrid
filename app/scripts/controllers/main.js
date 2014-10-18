'use strict';

/**
 * @ngdoc function
 * @name GridApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the GridApp
 */
angular.module('GridApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
    var endName = '';
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.loadImages = function(){
      $scope.imagesLoaded = false;
      $scope.posts = [];
      $http.get('http://www.reddit.com/r/'+$scope.query+'.json?limit=75'+endName).
      success(function(data){
        endName = '&after='+data.data.children[data.data.children.length-1].data.name;
        for(var element in data.data.children){
          var url = data.data.children[element].data.url;
          //check if the website is imgur
          if(url.match(/imgur.com\/[a-z\d]{7}[^_]/i) !== null && data.data.children[element].data.over_18 === false){
            $scope.posts.push({url: url, link: 'http://reddit.com'+data.data.children[element].data.permalink, title: data.data.children[element].data.title});
          }
        }
        $timeout(function(){
          //put images in a grid
          $('#images').justifiedGallery({
            rowHeight: 240
          });
          $scope.imagesLoaded = true;
          //jQuery event
          $('.image').hover(function(){
            var url = $(this).prop('src');
            //animate image
            $(this).addClass('hover');
          },
          function(){
            //stop animation
            $('.image').removeClass('hover');
          });
        }, 0);
      })
      .error(function(){
        console.log('error loading images.');
      })
    }; // end loadImages
    $scope.resetLoadImages = function(){
      endName = '';
      $scope.loadImages();
    }; // end resetLoadImages
    $scope.details = function(image){
      $scope.modalLink = image.post.link;
      $scope.modalTitle = image.post.title;
      $scope.modalUrl = image.post.url;
      $('#imageModal').modal();
    };
    //select correct tab

    $('.about-tab').removeClass('active');
    $('.home-tab').addClass('active');
  });
