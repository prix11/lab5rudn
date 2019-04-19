var express = require('express');
var router = express.Router();
var admin = require("./../information/admin.json");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('entry', {
        title: 'Admin' ,
        css: '/stylesheets/entry.css',
        js: "../javascript/entry.js"
    });
});

router.post('/entry', function(req, res, next) {
    var body = req.body;
    if(body.nickname === admin.nickname && body.password === admin.password)
        res.end("yes");
    else
        res.end("not");
});

module.exports = router;
