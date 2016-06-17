'use strict'

app.controller('SettingsCtrl', function($scope, UserFactory) {
	$scope.logout = function() {
	    UserFactory.logout().then(function() {
	      $state.go('app.events');
	    })
	};
})