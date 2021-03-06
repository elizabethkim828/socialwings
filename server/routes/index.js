'use strict';

var router = require('express').Router();

module.exports = router;

router.use('/users', require('./users'));
router.use('/events', require('./events'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
