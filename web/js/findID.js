function init() {
    $('[data-toggle="popover"]').popover();
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });
    $(".dropdown").mouseleave(function () {
        $(this).removeClass("open");
    })
}
function addCheckInput(){
    function checkAllSuccess(){
        if($("#inputLastName").parent().hasClass("has-success")&&
            $("#inputFirstName").parent().hasClass("has-success")&&
            $("#inputPhoneNumber").parent().hasClass("has-success")){
            $("#nextBtn").removeAttr("disabled");
        }
        else{
            $("#nextBtn").attr("disabled","disabled");
        }
    }
    $(".isEmpty").bind("input propertychange", function() {
        var value=$(this).val();
        if(value!=""){
            $(this).parent().addClass("has-success").removeClass("has-error");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
        checkAllSuccess();
    });
    $(".isPhoneNumber").bind("input propertychange", function() {
        var value=$(this).val();
        var reg = /^1[3456789]\d{9}$/
        if(reg.test(value)){
            $(this).parent().addClass("has-success").removeClass("has-error");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
        checkAllSuccess();
    });
}
$(function () {
    //初始化
    init();
    addCheckInput();
    $("#nextBtn").click(function (){
        $.ajax({
            url: "ChangeUserInfoDataBaseServlet",
            type: "POST",
            data: {
                "action":"selectID",
                "LastName":$("#inputLastName").val(),
                "FirstName":$("#inputFirstName").val(),
                "PhoneNumber":$("#inputPhoneNumber").val(),
            },
            dataType: "json",
            success: function (data) {
                var chats=eval(data);
                if(chats.hasID){
                    $("#msgDiv").html('<div class="alert alert-success" role="alert"><strong>已找到相关 Dtg ID </strong>请牢记您的ID<div><br><a href="login.jsp" class="btn btn-success">前往登录</a></div></div>');
                    $("#msgDiv").append('<h1 style="font-weight: bolder;">您的 Dtg ID</h1>');
                    $("#msgDiv").append('<h1>'+chats.ID+'</h1>');
                }
                else{
                    $("#msgDiv").html('<div class="alert alert-danger" role="alert"><strong>未找到相关 Dtg ID </strong>请检查信息是否正确</div>');
                }
            },
            error:function (){
                alert("请求失败");
            }
        });
    });
});