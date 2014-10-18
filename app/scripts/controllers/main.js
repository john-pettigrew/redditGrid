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
      $scope.posts = [];
      $http.get('http://www.reddit.com/r/'+$scope.query+'.json?limit=75'+endName).
      success(function(data){
        console.log(data.data.children[data.data.children.length-1].data.name);
        endName = '&after='+data.data.children[data.data.children.length-1].data.name;
        console.log(endName);
        for(var element in data.data.children){
          var url = data.data.children[element].data.url;
          //check if the website is imgur
          if(url.match(/imgur.com\/[a-z\d]{6}[^_]/i) !== null){
            console.log(url.match(/imgur.com\/[a-z\d]{7}[^_]/i));
            //console.log(data.data.children[element].data);
            $scope.posts.push({url: url, link: 'http://reddit.com'+data.data.children[element].data.permalink, title: data.data.children[element].data.title});
          }
        }
        $timeout(function(){
          //put images in a grid
          $('#images').justifiedGallery({
            rowHeight: 240
          });
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
      });
    } // end loadImages
    $scope.details = function(image){
      console.log(image);
      $scope.modalLink = image.post.link;
      $scope.modalTitle = image.post.title;
      $scope.modalUrl = image.post.url;
      $('#imageModal').modal();
    }
    //select correct tab
    $('.about-tab').removeClass('active');
    $('.home-tab').addClass('active');
  });
