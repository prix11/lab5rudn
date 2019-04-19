function register(id) {
    $.post("/auction/register",{id: id},Success);
};

function saveMoney(id) {
    var money = document.getElementById('money').value;
    $.post("/admin/people/change_men",{"id": id, "money": money});
};
function Success(id) {
    window.location.href = "/auction/current/" + id;
}

function redirectHome(id) {window.location.href = "/auction/" + id};