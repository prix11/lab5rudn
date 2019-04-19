
function registrated(id) {
    const nick = document.getElementById("name").value;
    const money = document.getElementById("money").value;
    $.post("/registration/registrated",{"name": nick, "money": money, "id": id},Success);
};
function Success(id) {
    window.location.href = "/auction/"+id;
}