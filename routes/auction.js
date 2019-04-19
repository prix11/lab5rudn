var express = require('express');
var router = express.Router();
var people = require("./../information/people.json");
var auctionators = require("./../information/auctionators.json");
var fs = require("fs");

/* GET home page. */
router.get('/:id([0-9]{1,})', function(req, res, next) {
    var b = people.filter(function (peopleId) {
        if (peopleId.id == req.params.id) res.render("auction.pug", {
            peopleId: peopleId,
            title: 'Auction' ,
            css: '/stylesheets/auction.css',
            js: "../javascript/auction.js"
        });
    });
});

router.get('/current/:id([0-9]{1,})', function(req, res, next) {
    var person = people.filter(function (person) {
        return person.id === parseInt(req.params.id)
    });
    var member = auctionators.filter(function (person) {
        return person.id === parseInt(req.params.id)
    });
    console.log(member);
    res.render("current_auction.pug", {
        person: person[0],
        isMember: member.length !== 0,
        title: 'Auction',
        css: '/stylesheets/auction_current.css',
        js: "../../javascript/auction_current.js"
    });
});

router.post('/register', function(req, res, next) {
    var body = req.body;
    var b = people.filter(function (men) {
        if (men != null && men.id == body.id) {
            var member = auctionators.filter(function (person) {
                return person.id === parseInt(body.id)
            });
            if (member.length === 0) {
                auctionators.push({"id": parseInt(body.id), "name": men.name, "money": men.money});
                fs.writeFile("information/auctionators.json", JSON.stringify(auctionators, null, 4), function (err) {
                    if (err) throw err;
                });
            }
            res.end(body.id);
        }
    });
});

module.exports = router;
