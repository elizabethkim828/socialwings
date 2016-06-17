app.controller('WishlistCtrl', function($scope, EventFactory, UserFactory) {

  UserFactory.getWishlist().then(function(events) {
    $scope.wishlist = events;
  })
  
  $scope.deleteItem = function(event) {
    $scope.wishlist.splice($scope.wishlist.indexOf(event), 1)
  }

  $scope.showDelete = true

});

