function redirectHome() {window.location.href = "/admin/pictures"};
function save(id) {
    console.log("111");
    var name = document.getElementById('namepic').value;
    var author = document.getElementById('authorpic').value;
    var max = document.getElementById('maxpic').value;
    var min = document.getElementById('minpic').value;
    var price = document.getElementById('pricepic').value;
    var description = document.getElementById('description').value;
    var picture = document.getElementById('picture').alt;
    var status = document.getElementById('statuspic').value;
    $.post("/admin/picture/change", {"name":name,"author":author,"description":description,"image":picture,"price":price,"min_step":min,"max_step":max,"auction":status,"id":id}, saveIsSuccess);
}
function saveIsSuccess(id) {console.log("ok");
}