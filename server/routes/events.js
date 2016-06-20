'use strict';
var router = require('express').Router();
var models = require('../models')
var Event = models.Event;
module.exports = router;

router.param('eventId', function(req, res, next, id) {
	Event.findById(id).then(function(event) {
		if (!event) res.sendStatus(404)
		req.event = event;
		next();
	}).catch(next)
})

router.get('/', function(req, res, next) {
	Event.findAll().then(function(events){
		res.json(events);
	}).catch(next)
});

router.get('/user', function(req, res, next) {
	Event.findAll({
		where: {
			eventAutherId: req.session.user.id
		}
	}).then(function(events){
		res.json(events);
	}).catch(next)
});

router.post('/', function(req, res, next) {
	req.body.eventAutherId = req.session.user.id
	Event.create(req.body).then(function(event){
		res.status(201).json(event);
	}).catch(next)
});

router.get('/:eventId', function(req, res) {
	res.json(req.event);
});

router.put('/:eventId', function(req, res, next) {
	req.event.update(req.body).then(function(event){
		res.status(200).json(event);
	}).catch(next)
});

router.delete('/:eventId', function(req, res, next) {
	req.event.destroy().then(function(){
		res.sendStatus(204);
	}).catch(next)
});
