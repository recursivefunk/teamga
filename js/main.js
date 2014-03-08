
(function(){

  'use strict';

  angular

    .module( 'rainbow', [] )

    .service('dataService', function(){
      this.currentUser = {
        firstname: 'Jane',
        lastname: 'Doe',
        city: 'Alexandria',
        state: 'VA',
        kids: [
          {
            name: 'billy'
          },
          {
            name: 'sarah'
          }
        ]
      };
    })

    .controller('MainCtrl', function($scope, dataService){

      $scope.currentUser = dataService.currentUser;

    })

    .controller('PlateCtrl', function($scope){
      console.log( $scope.$parent.currentUser );
    });

}());