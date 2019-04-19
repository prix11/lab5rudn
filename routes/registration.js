var express = require('express');
var router = express.Router();
var fs = require("fs");
var people = require("./../information/people.json");

router.get('/', function (req, res) {
    res.render("registration", {
        people: people,
        title: 'Registration',
        css: '/stylesheets/registration.css',
        js: "../javascript/registration.js"
    });
});

router.post('/registrated', function (req, res) {//*
    var body = req.body;
    var men = {
        "name": body.name,
        "money": body.money,
        "id": people.length
    };
    people.push(men);
    fs.writeFile("information/people.json", JSON.stringify(people, null, 4), function (err) {
        if (err) throw err;
    });
    res.end(body.id);
});

module.exports = router;