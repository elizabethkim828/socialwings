'use strict'

app.controller('EventsCtrl', function($scope, EventFactory, UserFactory, $state, $ionicPopup) {
	EventFactory.getAll().then(function(events) {
		$scope.loadedEvents = events;
	}).then(function() {

		// //initial loading of events (only 10s)
		// $scope.loadedEvents = []
		// for (var i = 0; i < 10; i++) {
		// 	$scope.loadedEvents.push($scope.events[i])
		// }

		// $scope.loadMore = function() {
		//     var loadedEventsLength = $scope.loadedEvents.length;
		//     for (var i = loadedEventsLength; i < loadedEventsLength + 10; i++) {
		//     	if ($scope.events[i]) $scope.loadedEvents.push($scope.events[i]);
		//     }
		    
		//     $scope.$broadcast("scroll.infiniteScrollComplete");
		// }
		  
		// $scope.moreDataCanBeLoaded = function() {
		// 	return $scope.loadedEvents.length !== $scope.events.length;
		// }

		$scope.doRefresh = function() {
			// if (EventFactory.cache.length > $scope.loadedEvents.length) {
			// 	console.log('in if statement')
			// 	var moreEvents = EventFactory.cache.slice($scope.loadedEvents.length)
			// 	console.log(moreEvents)
			// 	$scope.loadedEvents.concat(moreEvents);
			// }
			console.log(EventFactory.cache)
			//$scope.loadedEvents.push({title: 'test', createdAt: Date.now()});
		    $scope.$broadcast("scroll.refreshComplete");
		}
	})

	$scope.addToWishList = function (username, event) {
		console.log(event)
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
	
})

app.controller('EventCtrl', function($scope, EventFactory, $stateParams) {
	EventFactory.getById($stateParams.eventId).then(function(event) {
		$scope.event = event;
	});
})