var express = require('express');
var router = express.Router();
var pictures = require("./../information/picture.json");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin', {
        title: 'Admin' ,
        pictures: pictures,
        css: '/stylesheets/admin.css',
        js: "../javascript/admin.js"
    });
});

module.exports = router;
