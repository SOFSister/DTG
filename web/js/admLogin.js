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
            url: "AdmUserLogin",
            type: "POST",
            data: {
                "AdmID":$("#DtgIDInput").val(),
                "PassWord":$("#DtgpwdInput").val()
            },
            dataType: "json",
            success: function (data){
                var chats=eval(data);
                if(chats.isLogin){//登录成功
                    window.location.href="admIndex.jsp";
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