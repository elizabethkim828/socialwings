app.controller('WishlistCtrl', function($scope, EventFactory, UserFactory) {

  UserFactory.getWishlist().then(function(events) {
    $scope.wishlist = events;
  })
  
  $scope.deleteItem = function(event) {
  	UserFactory.removeFromWishList(event).then(function() {
  		$scope.wishlist.splice($scope.wishlist.indexOf(event), 1)
  	})
  }

});

