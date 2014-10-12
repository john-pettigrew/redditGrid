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
    $scope.images = [];
    $http.get('http://www.reddit.com/r/pugs.json?limit=75').
    success(function(data){
      console.log(data.data);
      console.log('success!');
      for(var element in data.data.children){
        var url = data.data.children[element].data.url;
        if(url.contains('i.imgur.com/')){
          $scope.images.push(url);
        }
      }
      $timeout(function(){
        var container = document.querySelector('#imageContainer');
        var msnry = new Masonry(container, {
          imageSelector: '.imageElement',
          columnWidth: 75,
          isFitWidth:true
        });
      }, 2);

    }).
    error(function(){
      console.log('error');
    });

  });
