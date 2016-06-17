'use strict'

app.factory('EventFactory', function($http) {
	var obj = {}
	obj.cache = []
	
	obj.getAll = function() {
		return $http.get('/app/events').then(function(res) {
			angular.copy(res.data, obj.cache)
			return obj.cache;
		})
	}

	obj.getById = function(id) {
		return $http.get('/app/events/' + id).then(function(res) {
			return res.data
		})	
	}

	obj.postEvent = function(data) {
		return $http.post('/app/events/', data).then(function(res) {
			obj.cache.push(res.data)
			return res.data
		})	
	}

	return obj
})