
(function(){

  'use strict';

  angular

    .module( 'rainbow', [] )

    .service('uiService', function(){
      this.init = function() {

        $(function(){
          $('.item').click(function(){
            var img = $(this).find('img');

            if ( $(img).hasClass('selected') ){
              $(img).removeClass('selected');
            } else {
              $(img).addClass('selected');
            }
          });
        });
      };
    })

    .filter('category', function(){
      return function(items, category) {
        return items.filter(function(anItem){
          return anItem.category === category;
        });
      };
    })

    .service('dataService', function(){

      this.totalBudget = 200;

      this.currentUser = {
        firstname: 'Crystal',
        lastname: 'Lite',
        email: 'clite@gmail.com',
        phone: '(703) 555-5555',
        city: 'Alexandria',
        state: 'VA',
        favoriteItems: [
          {
            id: 1,
            name: 'apple',
            price: 12,
            category: 'fruit'
          },
          {
            id: 2,
            name: 'orange',
            price: 6,
            category: 'fruit'
          },
          {
            id: 3,
            name: 'carrot',
            price: 2,
            category: 'vegetables'
          }
        ],
        kids: [
          {
            name: 'billy'
          },
          {
            name: 'sarah'
          }
        ]
      };

      this.cart = [

      ];

      this.items = [
        {
          id: 1,
          name: 'apple',
          price: 12,
          category: 'fruit'
        },
        {
          id: 2,
          name: 'orange',
          price: 6,
          category: 'fruit'
        },
        {
          id: 3,
          name: 'carrot',
          price: 2,
          category: 'vegetables'
        },
        {
          id: 4,
          name: 'chicken',
          price: 15,
          category: 'poultry'
        },
        {
          id: 5,
          name: 'fish',
          price: 40,
          category: 'poultry'
        },
        {
          id: 6,
          name: 'grape fruit',
          price: 10,
          category: 'fruit'
        },
        {
          id: 7,
          name: 'grape',
          price: 1,
          category: 'fruit'
        },
        {
          id: 8,
          name: 'strawberry',
          price: 12,
          category: 'fruit'
        },
        {
          id: 9,
          name: 'broccoli',
          price: 2,
          category: 'vegetables'
        },
        {
          id: 10,
          name: 'spinach',
          price: 5,
          category: 'vegetables'
        },{
          id: 11,
          name: 'garlic',
          price: 3,
          category: 'vegetables'
        },
        {
          id: 12,
          name: 'mushroom',
          price: 1,
          category: 'vegetables'
        },
        {
          id: 13,
          name: 'steak',
          price: 20,
          category: 'poultry'
        },
        {
          id: 14,
          name: 'lamb',
          price: 18,
          category: 'poultry'
        },
        {
          id: 15,
          name: 'sausage',
          price: 3,
          category: 'poultry'
        }
      ];
    })

    .controller('ProfileCtrl', function(dataService){
      $scope.currentUser = dataService.currentUser;
    })

    .controller('MainCtrl', function($scope, dataService, uiService){

      uiService.init();

      $scope.cart = dataService.cart;
      $scope.currentUser = dataService.currentUser;
      $scope.items = dataService.items;
      $scope.totalBudget = dataService.totalBudget;

      $scope.getItemSubTotal = function(item) {
        return( item.price * item.quantity );
      };

      $scope.getCartTotal = function() {
        var sum = 0;
        for ( var i = 0; i < $scope.cart.length; i++ ) {
          var item = $scope.cart[ i ];
          console.log( item )
          sum += ( item.price * item.quantity );
        }
        return sum;
      };

      $scope.filterCategory = function(cat) {

      };

      $scope.leftInBudget = function() {
        var left = dataService.totalBudget - $scope.getCartTotal();
        console.log( left )
        return left;
      };

      $scope.addOrRemoveItem = function(item) {

        var domItem = $('.item-' + item.id);
        if ( $(domItem).find('img').hasClass('selected') ) {
          console.log( 'item was deselected')

          var index = itemInCart( item );
          $scope.cart.splice( index, 1 );
        } else {

          var index = itemInCart( item );

          if ( !index ) {
            var tmp = item;
            item.quantity = 1;
            $scope.cart.push( item );
          }
        }
      };

      function itemInCart(item) {
        var index = null;
        for ( var i = 0; i < $scope.cart.length; i++ ) {
          if ( item.name === $scope.cart[ i ].name ) {
            return i;
          }
        }
      }

    });

}());