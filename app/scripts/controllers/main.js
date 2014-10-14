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
          var container = document.querySelector('#imageContainer');
          var msnry = new Masonry(container, {
            imageSelector: '.imageElement',
            isFitWidth:true,
          });
        }, 2);

      }).
      error(function(){
        console.log('error loading images.');
      });
    }
    //loadImages();
  });
