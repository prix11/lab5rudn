var express = require('express');
var router = express.Router();
var fs = require("fs");
var pictures = require("./../information/picture.json");

router.get('/', function(req, res, next) {
    res.render('pictures', { title: 'Pictures' , pictures: pictures, css: '/stylesheets/pictures.css', js: "../javascript/pictures.js"});
});

/*
    Изменение статуса картины: участвует в аукционе или нет
 */

router.post('/check', function (req, res) {
    var body = req.body;
    var b = pictures.filter(function (picture) {
        if (picture.id == body.id) {
            if (picture.auction === "yes") {
                picture.auction = "no";
            } else {
                picture.auction = "yes";
            }
            fs.writeFile("information/picture.json", JSON.stringify(pictures, null, 4), function (err) {
                if (err) throw err;
            });
        }
    });
    res.end(body.id);
});

module.exports = router;
