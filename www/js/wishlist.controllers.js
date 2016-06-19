app.controller('WishlistCtrl', function($scope, EventFactory, UserFactory, wishlist) {

  //UserFactory.getWishlist().then(function(events) {
    $scope.wishlist = wishlist;
  //})
  
  $scope.deleteItem = function(event) {
  	UserFactory.removeFromWishList(event).then(function() {
  		$scope.wishlist.splice($scope.wishlist.indexOf(event), 1)
  	})
  }

});

