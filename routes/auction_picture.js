var express = require('express');
var router = express.Router();
var fs = require("fs");
var pictures = require("./../information/picture.json");

router.get('/current', function (req, res, next) {
    var b = pictures.filter(function (picture) {
        if (picture.id == global.currentPicture )
            res.json({
                price: [].filter.call(picture.price, e => /\d/.test(e)).join("")
            })
    });
});

module.exports = router;