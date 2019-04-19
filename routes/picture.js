var express = require('express');
var router = express.Router();
var fs = require("fs");
var pictures = require("./../information/picture.json");

router.get('/:id([0-9]{1,})', function (req, res, next) {
    var b = pictures.filter(function (picture) {
        if (picture.id == req.params.id) res.render("picture.pug", {
            picture: picture,
            title: 'Picture',
            css: '/stylesheets/picture_style.css',
            js: "../../javascript/id_picture.js"
        });
    });
});

/*
    Изменение картинки
 */

router.post('/change', function (req, res) {
    var body = req.body;
    console.log(body);
    var b = pictures.filter(function (picture) {
        if (picture.id == body.id) {
            picture.name = body.name;
            picture.author = body.author;
            picture.step_max = body.step_max;
            picture.step_min = body.step_min;
            picture.price = body.price;
            picture.description = body.description;
            fs.writeFile("information/picture.json", JSON.stringify(pictures, null, 4), function (err) {
                if (err) throw err;
            });
        }
    });
    res.end(body.id);
});

module.exports = router;