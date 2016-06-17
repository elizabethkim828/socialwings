'use strict'

app.factory('UserFactory', function($http) {
	var obj = {}
	
	obj.getAll = function() {
		return $http.get('/app/users').then(function(res) {
			angular.copy(res.data, obj.cache)
			return obj.cache;
		})
	}

	obj.logIn = function(loginData) {
		return $http.post('/app/users/login/' + loginData.username, loginData).then(function(res) {
			if (res.data) return res.data;
			else return false
		})	
	}

	obj.getLoggedInUser = function(loginData) {
		return $http.get('/app/users/loggedInUser').then(function(res) {
			if (res.data) return res.data;
			else return false
		})	
	}

	obj.createUser = function(data) {
		return $http.post('/app/users/', data).then(function(res) {
			return res.data
		})	
	}

	return obj
})