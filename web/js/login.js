function init() {
    $('[data-toggle="popover"]').popover();
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });
    $(".dropdown").mouseleave(function () {
        $(this).removeClass("open");
    })
}
$(function () {
    //初始化
    init();
    $("#DtgIDSubmit").click(function (){
        $.ajax({
            url: "ChangeUserInfoDataBaseServlet",
            type: "POST",
            data: {
                "action":"getHasIDAndHasPwd",
                "DtgID":$("#DtgIDInput").val(),
                "PassWord":$("#DtgpwdInput").val()
            },
            dataType: "json",
            success: function (data){
                var chats=eval(data);
                if(chats.isLogin){//登录成功
                    window.location.href="../index.jsp";
                }
                else{
                    $("#loginErrorMsg").css("visibility","visible");
                    $("#DtgIDInput").parent().addClass("has-error");
                    $("#DtgIDInput").focus();
                    $("#DtgpwdInput").parent().addClass("has-error");
                }
            },
            error:function (){
                alert("请求失败");
            }
        });
    });
})