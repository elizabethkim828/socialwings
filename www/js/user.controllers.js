app.controller('UserCtrl', function($scope, $ionicModal, EventFactory, $state, UserFactory) {
	UserFactory.getLoggedInUser().then(function(user) {
		console.log('HELLO', user)
		$scope.currUser = user
	})

});

