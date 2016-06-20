'use strict'

app.controller('EventsCtrl', function($scope, EventFactory, UserFactory, $state, $ionicPopup, events) {
	$scope.loadedEvents = events;

	$scope.doRefresh = function() {
		EventFactory.getAll().then(function(events) {
			if (events.length > $scope.loadedEvents.length) {
				var moreEvents = events.slice($scope.loadedEvents.length)
				$scope.loadedEvents.concat(moreEvents);
			}
		})
	    $scope.$broadcast("scroll.refreshComplete");
	}

	$scope.addToWishList = function (username, event) {
		$ionicPopup.alert({
			title: "Added to Wishlist",
			template: "This event has been added to your wishlist!",
			okText: "Let's browse some more!",
			okType: "button-balanced"
		})
		UserFactory.addToWishList(username, event).then(function(res) {
			console.log(res)
		})
	}

	$scope.delete = function (event) {
		EventFactory.deleteEvent(event).then(function() {
			$scope.loadedEvents.splice($scope.loadedEvents.indexOf(event), 1)
		})
	}
	
})

app.controller('EventCtrl', function($scope, EventFactory, $stateParams) {
	EventFactory.getById($stateParams.eventId).then(function(event) {
		$scope.event = event;
	});
})