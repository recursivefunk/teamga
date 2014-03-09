
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
        if ( items ) {
          return items.filter(function(anItem){
            return anItem.category === category;
          });
        } else {
          return [];
        }
      };
    })

    .service('dataService', function($http){

      var self = this;

      this.getCart = function(callback) {
        $http({
          method: 'GET',
          url: '/cart'
        })
        .success(function(cart){
          self.cart = cart;

          if ( callback ) {
            return callback();
          }
        })
        .error(function(){
          console.error('an error occured getting cart :(')
          if ( callback ) {
            return callback();
          }
        });
      };

      this.updateCart = function() {
        $http({
          method: 'POST',
          url: '/cart',
          data: self.cart
        })
        .success(function(){
          console.log('successfully updated cart!');
        })
        .error(function(){
          console.error('an error occured while updating cart :(')
        })
      };

      this.totalBudget = 200;

      this.currentUser = {
        firstname: 'Crystal',
        lastname: 'Lite',
        email: 'clite@gmail.com',
        phone: '(703) 555-5555',
        city: 'Alexandria',
        state: 'VA',
        pickupLocation: '123 Beat st',
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
          category: 'fruit',
          src: 'images/food/apples.jpg',
          tip: 'Reward apple pie.'
        },
        {
          id: 2,
          name: 'orange',
          price: 6,
          category: 'fruit',
          src: 'images/food/oranges.jpg'
        },
        {
          id: 3,
          name: 'zucchini',
          price: 2,
          category: 'vegetables',
          src: 'images/food/zucchini.jpg',
        },
        {
          id: 4,
          name: 'chicken',
          price: 15,
          category: 'poultry',
          src: 'images/food/chicken.jpg'
        },
        {
          id: 5,
          name: 'fish',
          price: 40,
          category: 'poultry',
          src: 'images/food/salmon.jpg'
        },
        {
          id: 6,
          name: 'grape fruit',
          price: 10,
          category: 'fruit',
          src: 'images/food/grapefruit.jpg'
        },
        {
          id: 7,
          name: 'grape',
          price: 1,
          category: 'fruit',
          src: 'images/food/grapes.jpg'
        },
        {
          id: 8,
          name: 'strawberry',
          price: 12,
          category: 'fruit',
          src: 'images/food/strawberries.jpg'
        },
        {
          id: 9,
          name: 'broccoli',
          price: 2,
          category: 'vegetables',
          src: 'images/food/broccoli.jpg'
        },
        {
          id: 10,
          name: 'spinach',
          price: 5,
          category: 'vegetables',
          src: 'images/food/spinach.jpg'
        },{
          id: 11,
          name: 'garlic',
          price: 3,
          category: 'vegetables',
          src: 'images/food/garlic.jpg'
        },
        {
          id: 12,
          name: 'mushroom',
          price: 1,
          category: 'vegetables',
          src: 'images/food/mushroom.jpg'
        },
        {
          id: 13,
          name: 'steak',
          price: 20,
          category: 'poultry',
          src: 'images/food/steak.jpg'
        },
        {
          id: 14,
          name: 'lamb',
          price: 18,
          category: 'poultry',
          src: 'images/food/lamb.jpg'
        },
        {
          id: 15,
          name: 'sausage',
          price: 3,
          category: 'poultry',
          src: 'images/food/sausage.jpg'
        }
      ];
    })

    .controller('ProfileCtrl', function($scope, dataService){
      dataService.getCart(function(){
        $scope.cart = dataService.cart;
        $scope.currentUser = dataService.currentUser;
        $scope.items = dataService.items;
        $scope.totalBudget = dataService.totalBudget;

        $scope.listFavs = function(){
          var items = $scope.currentUser.favoriteItems.map(function(item){
            return item.name;
          });
          return items.join(', ');
        };

        $scope.leftInBudget = function() {
          var left = dataService.totalBudget - $scope.getCartTotal();
          return left;
        };

        $scope.getCartTotal = function() {
          var sum = 0;
          for ( var i = 0; i < $scope.cart.length; i++ ) {
            var item = $scope.cart[ i ];
            sum += ( item.price * item.quantity );
          }
          return sum;
        };
      });

      $scope.currentUser = dataService.currentUser;
    })

    .controller('MainCtrl', function($scope, dataService, uiService){

      uiService.init();

      dataService.getCart(function(){

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
            sum += ( item.price * item.quantity );
          }
          return sum;
        };

        $scope.leftInBudget = function() {
          var left = dataService.totalBudget - $scope.getCartTotal();
          return left;
        };

        $scope.removeItem = function( item ) {
          for ( var i = 0; i < $scope.cart.length; i++ ) {
            if ( item.id === $scope.cart[ i ].id ) {
              $scope.cart.splice( i, 1 );
              dataService.updateCart();
            }
          }
        };

        $scope.itemClass = function(item) {
          var i = itemInCart( item );
          if ( i || i === 0 ) {
            return {
              border: 'solid #A5F3E3 4px'
            };
          }
        };

        $scope.getIsFavStyle = function(item) {
          var fav = $scope.currentUser.favoriteItems;
          for ( var i = 0; i <= fav.length; i++ ) {
            if ( fav[ i ] && ( item.id === fav[ i ].id ) ) {
              return {
                color: 'red'
              };
            }
          }
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
          dataService.updateCart();
        };

        function itemInCart(item) {
          var index = null;
          for ( var i = 0; i < $scope.cart.length; i++ ) {
            if ( item.id === $scope.cart[ i ].id ) {
              return i;
            }
          }
        }

      });

    });

}());