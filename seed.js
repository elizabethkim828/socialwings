/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
const models = require('./server/models');
const db = models.db
const User = models.User
const Event = models.Event
const Promise = require('sequelize').Promise;

var seeddb = function () {

    var users = [
        {
            username: 'liz',
            email: 'liz@liz.com',
            password: 'aaa',
            about: 'I love to eat, dance, and work out!',
            profilePic: 'img/profile.jpg'
        },
        {
            username: 'obama',
            email: 'obama@obama.com',
            password: 'aaa',
            about: 'I love to preside over the U.S. of A. FYI, I\'m the one on the left.',
            profilePic: 'img/obama.jpg'
        }
    ];

    var creatingUsers = User.bulkCreate(users);

    var events = [];
    var categories = ['shopping', 'music', 'drinks', 'fitness', 'nature']
    for (var i = 1; i < 51; i++) {
        events.push({
            title: 'Event ' + i,
            urlTitle: ('Event ' + i).replace(/\s+/g, "_").replace(/\W/g, ""),
            description: 'description of event',
            category: categories[Math.floor(Math.random()*categories.length)]
        })    
    }
    
    var creatingEvents = Event.bulkCreate(events);

    return Promise.all([creatingUsers, creatingEvents])

};

db.sync({ force: true })
    .then(function () {
      return seeddb()
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
