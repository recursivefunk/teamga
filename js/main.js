
(function(){

  'use strict';

  angular

    .module( 'rainbow', ['firebase'] )

    .controller('MainCtrl', function($scope, $firebase){
      $scope.message = "";
    });

}());