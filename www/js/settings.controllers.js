'use strict'

app.controller('SettingsCtrl', function($scope, UserFactory, $state) {
	$scope.deleteCurrUser = function() {
		return UserFactory.deleteCurrUser().then(function() {
			return $state.go('app.events')
		})
	}
})