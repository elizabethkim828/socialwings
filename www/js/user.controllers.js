app.controller('UserCtrl', function($scope, $ionicModal, EventFactory, $state, UserFactory) {
	UserFactory.getLoggedInUser().then(function(user) {
		$scope.currUser = user
	})
});

