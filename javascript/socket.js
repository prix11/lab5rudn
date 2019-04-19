var socket;

function join(id) {
    console.log("join", id);
    socket = io.connect("http://localhost:3030");
    socket.on("connect", () => {
        socket.json.emit("join", {"id": id});
    });
    socket.on("msg", (msg)=>{
        console.log(JSON.stringify(msg.message));
        addUL(msg.message);
        if(msg.signal === "start")
            startTimer();
            timerPicture();
    });
}

function start(){
    socket.json.emit("start_auction", {});
}

setTimeout( function(){
    if(window.id !== undefined)
        join(window.id);
}, 100);

function addUL(text){
    let li = document.createElement("li");

    li.innerHTML = text;
    wind.parentNode.insertBefore(li, wind.nextSibling);
}

function init(elem, options){ elem.addClass('countdownHolder'); }
// Создает анимационный эффект между двумя цифрами таймера
function switchDigit(position,number){

    var digit = position.find('.digit')

    if(digit.is(':animated')){return false;}

    if(position.data('digit') == number){return false;}

    position.data('digit', number);

    var replacement = $('<div>',{
        'class':'digit',
        css:{
            top:'-2.1em',
            opacity:0
        },
        html:number
    });

    digit
        .before(replacement)
        .removeClass('static')
        .animate({top:'2.5em',opacity:0},'fast',function(){digit.remove();})

    replacement
        .delay(100)
        .animate({top:0,opacity:1},'fast',function(){replacement.addClass('static');});
}
(function($){

    // количество секунд в каждом блоке времени
    var hours    = 60*60,
        minutes    = 60;

    // создание плагина
    $.fn.countdown = function(prop){

        var options = $.extend({
            callback    : function(){},
            timestamp    : 0
        },prop);

        var left, d, h, m, s, positions;

        // Инициализация таймера
        init(this, options);

        positions = this.find('.position');

        (function tick(){

            // Оставьшееся время
            left = Math.floor((options.timestamp - (new Date())) / 1000);

            if(left < 0){
                left = 0;
            }

            // Количество оставшихся часов
            h = Math.floor(left / hours);
            updateDuo(2, 3, h);
            left -= h*hours;

            // Количество оставшихся минут
            m = Math.floor(left / minutes);
            updateDuo(4, 5, m);
            left -= m*minutes;

            // Количество оставшихся секунд
            s = left;
            updateDuo(6, 7, s);

            // Calling an optional user supplied callback
            options.callback(d, h, m, s);

            // Автоматический вызов этой функции каждую секунду
            setTimeout(tick, 1000);
        })();

        // Эта функция обновляет две цифры в блоке
        function updateDuo(minor,major,value){
            switchDigit(positions.eq(minor),Math.floor(value/10)%10);
            switchDigit(positions.eq(major),value%10);
        }

        return this;
    };

    /* Две вспомогательные функции, которые мы создали ранее */
})(jQuery);
function startTimer(){
    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth();
    let day = data.getDate();
    let hours = data.getHours();
    let min = data.getMinutes();
    let sec = data.getSeconds();

    var ts = new Date(year, month, day, hours, min, sec + 10); //окончание аукциона. Нужно изменить часы, когда закончится аукцион

    $('#countdown').countdown({timestamp: ts});
}

function timer(f) {
    var f_time = Date.parse(f);

    function timer_go() {
        var n_time = Date.now();
        var diff = f_time - n_time;
        if(diff <= 0) return false;
        var left = diff % 1000;

        //секунды
        diff = Math.floor(diff / 1000);
        var s = diff % 60;
        if(s < 10) {
            $(".seconds_1").html(0);
            $(".seconds_2").html(s);
        }else {
            $(".seconds_1").html(Math.floor(s / 10));
            $(".seconds_2").html(s % 10);
        }
        //минуты
        diff = Math.floor(diff / 60);
        var m = diff % 60;
        if(m < 10) {
            $(".minutes_1").html(0);
            $(".minutes_2").html(m);
        }else {
            $(".minutes_1").html(Math.floor(m / 10));
            $(".minutes_2").html(m % 10);
        }
        setTimeout(timer_go, left);
    }
    setTimeout(timer_go, 0);
}

function timerPicture() {
    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth();
    let day = data.getDate();
    let hours = data.getHours();
    var time = new Date(year, month, day, hours, 20);
    timer(time);
}