'use strict'

app.factory('EventFactory', function($http) {
	var obj = {}
	
	obj.getAll = function() {
		return $http.get('/app/events').then(function(res) {
			return res.data
		})
	}

	return obj
})