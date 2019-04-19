function entry() {
    var nickname = document.getElementById('nickname').value;
    var password = document.getElementById('password').value;
    $.post("/entry",{"nickname": nickname, "password": password},Success);
};

function Success(message) {
    if (message === "yes")
        window.location.href = "/admin";
    else
        window.location.href = "/";
}

function auctioners() {window.location.href = "/registration";};