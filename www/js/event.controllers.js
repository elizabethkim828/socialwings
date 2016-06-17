'use strict'

app.controller('EventsCtrl', function($scope, EventFactory) {
	EventFactory.getAll().then(function(events) {
		$scope.events = events;
	}).then(function() {
		$scope.loadedEvents = []

		for (var i = 0; i < $scope.events.length; i++) {
			$scope.loadedEvents.push($scope.events[i])		
		}

		$scope.loadMore = function() {
		    var loadedEventsLength = $scope.loadedEvents.length;
		    for (var i = loadedEventsLength; i < loadedEventsLength + 5; i++) {
		    	if (loadedEventsLength < $scope.events.length) {
			    	$scope.loadedEvents.push($scope.events[$scope.loadedEvents.length]);
			    }	
		    }
		    
		    $scope.$broadcast("scroll.infiniteScrollComplete");
		}
		  
		$scope.moreDataCanBeLoaded = function() {
			return $scope.loadedEvents.length !== $scope.events.length;
		}
	})

	
})

app.controller('EventCtrl', function($scope, EventFactory, $stateParams) {
	EventFactory.getById($stateParams.eventId).then(function(event) {
		$scope.event = event;
	});
})