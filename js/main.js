
(function(){

  'use strict';

  angular

    .module( 'rainbow', ['firebase'] )

    .controller('MainCtrl', function($scope, $firebase){
      var userRef = new Firebase( 'blinding-fire-7767.firebaseIO.com/users' );
      $scope.users = $firebase( userRef );
      console.log( $scope.users );
    });

}());