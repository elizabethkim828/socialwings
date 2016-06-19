'use strict'

app.factory('UserFactory', function($http) {
	var obj = {}
	obj.wishlistCache = []

	obj.getAll = function() {
		return $http.get('/app/users').then(function(res) {
			return res.data;
		})
	}

	obj.logIn = function(loginData) {
		return $http.post('/app/users/login/' + loginData.username, loginData).then(function(res) {
			if (res.data) return res.data;
			else return false
		})	
	}

	obj.logout = function() {
		return $http.post('/app/users/logout').then(function(res) {
			return true
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

	obj.getWishlist = function() {
		return $http.get('/app/users/wishlist').then(function(res) {
			angular.copy(res.data, obj.wishlistCache)
			return obj.wishlistCache
		})
	}

	obj.addToWishList = function(username, event) {
		return $http.post('/app/users/'+username+'/wishlist', event).then(function(res) {
			obj.wishlistCache.push(res.data)
			return res.data
		})
	}

	obj.removeFromWishList = function(event) {
		return $http.delete('/app/users/wishlist/'+event.id).then(function(res) {
			return res.data
		})
	}

	return obj
})