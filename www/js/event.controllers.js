'use strict'

app.controller('EventsCtrl', function($scope, EventFactory) {
	EventFactory.getAll().then(function(events) {
		$scope.events = events;
	});

	$scope.loadedEvents = []
	$scope.loadMore = function() {
	    var loadedEventsLength = $scope.loadedEvents.length;
	    for (var i = loadedEventsLength; i < loadedEventsLength + 10; i++) {
	      $scope.loadedEvents.push($scope.events[$scope.loadedEvents.length]);
	    }
	    $scope.$broadcast("scroll.infiniteScrollComplete");
	}
	  
	$scope.moreDataCanBeLoaded = function() {
		return $scope.loadedEvents.length !== $scope.events;
	}
})

app.controller('EventCtrl', function($scope, EventFactory) {
	
})