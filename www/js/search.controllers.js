'use strict'

app.controller('SearchCtrl', function($scope) {
	$scope.events = []
	for (var i = 1; i <= 50; i++) {
		$scope.events.push({ name: "Event "+i });
	}

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