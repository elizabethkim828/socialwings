'use strict'

app.factory('UserFactory', function($http) {
	var obj = {}
	
	obj.getAll = function() {
		return $http.get('/app/users').then(function(res) {
			angular.copy(res.data, obj.cache)
			return obj.cache;
		})
	}

	obj.getByUsername = function(username) {
		return $http.get('/app/users/' + username).then(function(res) {
			return res.data
		})	
	}

	obj.createUser = function(data) {
		return $http.post('/app/users/', data).then(function(res) {
			return res.data
		})	
	}

	return obj
})