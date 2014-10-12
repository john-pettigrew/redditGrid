'use strict';

/**
 * @ngdoc function
 * @name redditGridApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the redditGridApp
 */
angular.module('redditGridApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
