var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('Hello root page ');
});

//app.get for users, just for test
app.get('/users', function(req,res) {
    res.send('Hello users page');

});

//app.get to show the list of users saved in database by id
//GET /users/:id
app.get('/users/:id',function(req,res) {
    var userId = parseInt(req.params.id, 10);

    db.user.findById(userId).then(function (users) {
        if (!!users) {
            res.json(users.toJSON());
        } else {
            res.status(404).send();
        }
    }), function (e) {
        res.status(500).send();
    }
});

// POST/users - app.post for creating users 
app.post('/users', function (req, res) {
    var body = _.pick(req.body, 'firstName','lastName','email','password', 'dob', 'phone', 'address', 'picture'); //disallow unspecified data

    //create user if the requested data is good
    db.user.create(body).then(function (user) {
        res.json(user.toJSON());
    }, function (e) {
        res.status(400).json(e);
    });
});

// POST/users/login - login authentication
app.post('/users/login', function (req, res) {
    var body = _.pick(req.body, 'email', 'password');

    if (typeof body.email !== 'string' || typeof body.password !== 'string') {
        return res.status(400).send();
    }

    db.user.findOne({
        where: {
            email: body.email
        }
    }).then(function (user) {
        if (!user || !(body.password, user.get('password'))) {
            return res.status(401).send();
        }

        res.json(user.toPublicJSON());
    }, function (e) {
        res.status(500).send();
    });
});


db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '!');
    });
});
