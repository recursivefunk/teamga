
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
      $scope.amountEntered = 0;
      $scope.options = [
        'banannas',
        'apples',
        'oranges'
      ];
      $scope.$watch('amountEntered', function(newAmount, oldAmount){
        if ( newAmount >= 10 ) {
          $scope.optionAfforded = $scope.options[ 0 ];
        } else if ( newAmount <= 9 && newAmount >= 5 ) {
          $scope.optionAfforded = $scope.options[ 1 ];
        } else {
          $scope.optionAfforded =  'nada';
        }
      });

    })

    .controller('PlateCtrl', function($scope){
      console.log( $scope.$parent.currentUser );
    });

}());