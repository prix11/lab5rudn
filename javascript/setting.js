function saveA(id) {
    var time = document.getElementById('time').value;
    var data = document.getElementById('data').value;
    var timeout = document.getElementById('timeout').value;
    var pause = document.getElementById('pause').value;
    var interval = document.getElementById('interval').value;
    $.post("/admin/setting_auction/change_auction", {"data":data,"time":time,"timeout":timeout,"interval":interval,"pause":pause}, saveIsSuccess);
}
function saveIsSuccess(id) {
    console.log("ok");
}
function Home() {window.location.href = "/admin"};