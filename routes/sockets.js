var express = require('express');
var router = express.Router();
var fs = require("fs");
var auctionators = require("./../information/auctionators.json");
var people = require("./../information/people.json");

const io = require('socket.io').listen(3030);

var g_socket = null;

io.sockets.on('connection', (socket)=>{
    g_socket = socket;
    socket.on('join', (msg)=>{
        if(msg.id===-1)
        {
            socket["name"] = "admin";
            send(socket, `Присоединился admin`);
        }
        else
            var b = people.filter(function (men) {
                if (men != null && men.id == msg.id) {
                    socket["name"] = men.name;
                    send(socket, `Присоединился ${men.name}`);
                }
            });
    });
    socket.on('start_auction', () => {
        startAuction(socket);
    })
});

function send(socket, msg) {
    let time = (new Date()).toLocaleTimeString();
    socket.json.emit("msg", {"message":`${time} ${msg}`});
    if(socket["name"] !== "admin")
        socket.broadcast.json.emit("msg", {"message":`${time} ${msg}`});
}

var period = 10;

function startAuction(socket){
    //global.timerCommon = new Date();
    socket.json.emit("msg", {"message":`${(new Date()).toLocaleTimeString()} Аукцион начался`, "signal" : "start"});
    socket.broadcast.json.emit("msg", {"message":`${(new Date()).toLocaleTimeString()} Аукцион начался`, "signal" : "start"});

    setTimeout( function() {
        socket.json.emit("msg", {"message":`${(new Date()).toLocaleTimeString()} Аукцион закончен`, "signal" : "end"});
        socket.broadcast.json.emit("msg", {"message":`${(new Date()).toLocaleTimeString()} Аукцион закончен`, "signal" : "end"});
    }, 1000 * period);
}

module.exports = router;