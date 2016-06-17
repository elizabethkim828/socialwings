'use strict';
var router = require('express').Router();
var models = require('../models')
var User = models.User;
var Event = models.Event;
module.exports = router;

router.param('username', function(req, res, next, username) {
	User.findByUsername(username).then(function(user) {
		if (!user) res.sendStatus(404)
		req.user = user;
		next();
	}).catch(next)
})

router.get('/', function(req, res, next) {
	User.findAll().then(function(users){
		res.json(users);
	}).catch(next)
});

router.post('/', function(req, res, next) {
	User.create(req.body).then(function(user){
		res.status(201).json(user);
	}).catch(next)
});

router.post('/logout', function(req, res) {
	req.session.destroy()
})

router.get('/loggedInUser', function(req, res) {
	res.json(req.session.user);
});

router.get('/wishlist', function(req, res) {
	User.findById(req.session.user.id).then(function(user) {
		user.getEvents().then(function(events) {
			res.json(events)
		})
	})
})

router.get('/:username', function(req, res) {
	res.json(req.user);
});

router.post('/login/:username', function(req, res) {
	if (req.user) {
		if (req.user.password !== req.body.password) {
			res.sendStatus(403)
		} else {
			req.session.user = req.user
			res.json(req.user)
		}
	} else {
		res.send('Username not found')
	}
});

router.post('/:username/wishlist', function(req, res) {
	Event.findOne({
		where: {
			id: req.body.id
		}
	}).then(function(event) {
		return event.addUsers([req.user])
	}).then(function(result) {
		res.sendStatus(201)
	})
})

router.put('/:userId', function(req, res, next) {
	req.user.update(req.body).then(function(user){
		res.status(200).json(user);
	}).catch(next)
});

router.delete('/:userId', function(req, res, next) {
	req.user.destroy().then(function(){
		res.sendStatus(204);
	}).catch(next)
});
