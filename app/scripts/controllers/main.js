'use strict';

/**
 * @ngdoc function
 * @name redditGridApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the redditGridApp
 */
angular.module('redditGridApp')
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
          if(url.indexOf('i.imgur.com/') > -1){
            $scope.images.push(url);
          }
        }
        $timeout(function(){
          console.log('timeout');
          $('#images').justifiedGallery();
          //jQuery event
          $('.image').hover(function(){
            var url = $(this).prop('src');
            $(this).addClass('hover');
            console.log(url);
            //$('.imageRow').append('<img class="hover hover-image" src=\"'+url+'\">');
          },
          function(){
            $('.image').removeClass('hover');
          });
        }, 2);

      })
      .error(function(){
        console.log('error loading images.');
      });
    }
    //loadImages();
  });
