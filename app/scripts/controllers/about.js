'use strict';

/**
 * @ngdoc function
 * @name GridApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the GridApp
 */
angular.module('GridApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    //select correct tab
    $('.about-tab').addClass('active');
    $('.home-tab').removeClass('active');
  });
