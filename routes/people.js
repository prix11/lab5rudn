var express = require('express');
var router = express.Router();
var fs = require("fs");
var people = require("./../information/people.json");
var auctionators = require("./../information/auctionators.json");

router.get('/', function (req, res, next) {
    res.render("people.pug", {
        people: auctionators,
        title: 'Auctionators',
        css: '/stylesheets/people.css',
        js: "../javascript/people.js"
    });
});

/*
    Изменение участника
 */
function balance(body, name, nameJSON){
    var b = name.filter(function (men) {
        if (men != null && men.id == body.id) {
            men.money = body.money;
            fs.writeFile(`information/${nameJSON}.json`, JSON.stringify(name, null, 4), function (err) {
                if (err) throw err;
            });
        }
    });
};
router.post('/change_men', function (req, res) {
    var body = req.body;
    balance(body,people,"people");
    balance(body,auctionators,"auctionators");
    res.end(body.id);
});

module.exports = router;
