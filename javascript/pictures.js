function save(id) {
    $.post("/admin/pictures/check", {id: id}, saveIsSuccess);
}
function saveIsSuccess(id) {
    console.log("111");
    $("#idWalkTable tr").each(function () {
        currentRow = this;
        $("th", this).each(function () {
            if ($(this).index() == 3) {
                if (this.textContent == id) {
                    var customerId = $(currentRow).find("th").eq(2).html();
                    var customer = "<input name=\"id\" value=\""+id+"\" type=\"text\" hidden=\"hidden\"><input id=\"botton\" value=\"yes\" onclick=\"save("+id+")\" type=\"submit\">";
                    console.log(customerId);
                    console.log(customer);
                    if(customerId == customer) {$(currentRow).find("th").eq(2).html("<input name=\"id\" value=\""+id+"\" type=\"text\" hidden=\"hidden\"><input id=\"botton\" value=\"no\" onclick=\"save("+id+")\" type=\"submit\">");}
                    else {$(currentRow).find("th").eq(2).html("<input name=\"id\" value=\""+id+"\" type=\"text\" hidden=\"hidden\"><input id=\"botton\" value=\"yes\" onclick=\"save("+id+")\" type=\"submit\">");}
                }
            }
        })
    })}
function redirect(id){ window.location.href = "/admin/picture/" + id};
function redirectHome() {window.location.href = "/admin"};