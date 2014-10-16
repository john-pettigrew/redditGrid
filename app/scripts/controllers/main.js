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
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.loadImages = function(){
      $scope.images = [];
      $http.get('http://www.reddit.com/r/'+$scope.query+'.json?limit=75').
      success(function(data){
        for(var element in data.data.children){
          var url = data.data.children[element].data.url;
          //check if the website is imgur
          if(url.indexOf('i.imgur.com/') > -1){
            $scope.images.push(url);
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
    }
    //select correct tab
    $('.about-tab').removeClass('active');
    $('.home-tab').addClass('active');
  });
