
(function(){

  'use strict';

  angular

    .module( 'rainbow', [] )

    .service('uiService', function(){
      this.init = function() {
        $('.item').click(function(){
          var img = $(this).find('img');

          if ( $(img).hasClass('selected') ){
            $(img).removeClass('selected');
          } else {
            $(img).addClass('selected');
          }
        });
      };
    })

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

      this.items = [
        {

        },
        {

        },
        {

        },
        {

        },
        {

        }
      ];
    })

    .controller('MainCtrl', function($scope, dataService, uiService){

      uiService.init();

      $scope.currentUser = dataService.currentUser;
      $scope.items = dataService.items;

    })

}());