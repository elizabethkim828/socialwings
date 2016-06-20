'use strict'

app.factory('EventFactory', function($http) {
	var obj = {}
	obj.cache = []
	obj.myEventsCache = []
	
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

	obj.getAllByCurrUser = function() {
		return $http.get('/app/events/user').then(function(res) {
			angular.copy(res.data, obj.myEventsCache)
			return obj.myEventsCache
		})	
	}

	obj.postEvent = function(data) {
		return $http.post('/app/events/', data).then(function(res) {
			obj.cache.push(res.data)
			obj.myEventsCache.push(res.data)
			return res.data
		})	
	}

	obj.deleteEvent = function(event) {
		return $http.delete('/app/events/'+ event.id)
	}

	return obj
})