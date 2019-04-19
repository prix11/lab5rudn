var express = require('express');
var router = express.Router();
var fs = require("fs");
var auction = require("./../information/auction.json");

router.get('/', function (req, res, next) {
    res.render("setting_auction.pug", {
        auction: auction,
        title: 'Setting auction',
        css: '/stylesheets/setting_auction.css',
        js: "../javascript/setting.js"
    });
});

/*
    Изменение настроек аукциона
 */

router.post('/change_auction', function (req, res) {
    var body = req.body;
    auction.data = body.data;
    auction.interval = body.interval;
    auction.time = body.time;
    auction.pause = body.pause;
    auction.timeout = body.timeout;
    fs.writeFile("information/auction.json", JSON.stringify(auction, null, 4), function (err) {
        if (err) throw err;
    });
    res.end(body.data);
});

module.exports = router;