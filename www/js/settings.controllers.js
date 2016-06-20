'use strict'

app.controller('SettingsCtrl', function($scope, $ionicActionSheet, $ionicHistory, UserFactory, $state) {
	$scope.deleteCurrUser = function() {
		$ionicActionSheet.show({
	      destructiveText: 'Yes, delete my account',
	      cancelText: 'Cancel',
	      titleText: 'Are you sure you want to delete your account?',
	      destructiveButtonClicked: function() {
	        return $ionicHistory.clearCache().then(function(){
	          $ionicHistory.nextViewOptions({
	            disableBack: true
	          });
	        }).then(function() {
	        	return UserFactory.deleteCurrUser()
	        }).then(function() {
				return $state.go('app.events')
			})
	      }
	    })
		
	}
})