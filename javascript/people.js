function deletePeople(id){
    $.post("/admin/people/delete",{id: id},deleteIsSuccess);
}
function deleteIsSuccess(id){
    $("#table_people tr").each(function(){
        currentRow = this;
        $("th", this).each(function(){
            if($(this).index() == 3) {
                if(this.textContent == id){
                    $(currentRow).remove();
                }
            }
        })
    })
}
function save(id) {
    var name = document.getElementById('namep').value;
    var money = document.getElementById('money'+id).value;
    $.post("/admin/people/change_men", {"name":name,"money":money,"id":id}, saveIsSuccess);
}
function saveIsSuccess(id) {
    console.log("ok");
}
function redirectHome() {window.location.href = "/admin"};