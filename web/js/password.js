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
    function isAllSuccess(){
        if($("#DtgpwdInput").parent().hasClass("has-success")&&
            $("#DtgpwdAgainInput").parent().hasClass("has-success")&&
            $("#DtgEmailMsgInput").parent().hasClass("has-success")){
            $("#nextBtn").removeAttr("disabled");
            $("#nextBtn").unbind('click');
            $("#nextBtn").click(function (){
                $.ajax({
                    url: "CheckChangePwdEmailCode",
                    type: "POST",
                    data: {
                        "EmailCode":$("#DtgEmailMsgInput").val(),
                        "EmailID":$("#DtgIDInput").val()
                    },
                    dataType: "json",
                    success: function (data){
                        var chats=eval(data);
                        if(chats.emailCode){
                            $("#codeErrorMsg").css("visibility","hidden");
                            $.ajax({
                                url: "ChangeUserInfoDataBaseServlet",
                                type: "POST",
                                data: {
                                    "action":"changePwd",
                                    "DtgID":$("#DtgIDInput").val(),
                                    "PassWord":$("#DtgpwdInput").val()
                                },
                                dataType: "text",
                                success: function (data){
                                    $("#afterNextBtn").append('<div class="alert alert-success" role="alert"><strong>重置成功，</strong>即将跳转到登录界面...</div>');
                                    setTimeout(function (){
                                        window.location.href="login.jsp";
                                    },2000);
                                },
                                error:function (){
                                    alert("请求失败");
                                }
                            });
                        }
                        else{
                            $("#codeErrorMsg").css("visibility","visible");
                            $("#DtgEmailMsgInput").parent().removeClass("has-success").addClass("has-error");
                            $("#DtgEmailMsgInput").focus();

                        }
                        $("#nextBtn").attr("disabled","disabled");
                    },
                    error:function (){
                        alert("请求失败");
                    }
                });
            });
        }
        else{
            $("#nextBtn").attr("disabled","disabled");
        }
    }
    $(".isEmail").bind("input propertychange", function() {
        //如果临时修改 重新初始化
        $("#nextBtn").attr("disabled","disabled").val(" 继续");
        $("#nextBtn").unbind('click');
        $("#nextBtn").click(initNextBtn);
        $("#afterNextBtn").css("display","none");
        $("#DtgpwdInput").parent().removeClass("has-success").removeClass("has-error");
        $("#DtgpwdInput").val("");
        $("#DtgpwdAgainInput").val("");
        $("#DtgpwdAgainInput").parent().removeClass("has-success").removeClass("has-error");
        $("#pwdErrorMsg").css("visibility","hidden");
        $("#DtgEmailMsgInput").val("");
        $("#DtgEmailMsgInput").parent().removeClass("has-success").removeClass("has-error");
        $("#codeErrorMsg").css("visibility","hidden");
        var value=$(this).val();
        var reg = /^\w+@([a-z0-9]{1,6})(\.[a-z]{2,3})+$/i;
        if(reg.test(value)){
            $(this).parent().addClass("has-success").removeClass("has-error");
            $("#nextBtn").removeAttr("disabled");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
            $("#nextBtn").attr("disabled","disabled");
        }
    });
    $(".isEmpty").bind("input propertychange", function() {
        var value=$(this).val();
        if(value!=""){
            $(this).parent().addClass("has-success").removeClass("has-error");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
        isAllSuccess();
    });
    $(".isAgainPwd").bind("input propertychange", function() {
        var value=$(this).val();
        if(value==""){
            return;
        }
        var aimValue=$("#DtgpwdInput").val();
        if(value!=aimValue){
            $("#pwdErrorMsg").css("visibility","visible");
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
        else{
            $("#pwdErrorMsg").css("visibility","hidden");
            $(this).parent().addClass("has-success").removeClass("has-error");
        }
        isAllSuccess();
    });
    function lengthStrength(str) {
        if(str.length==0){
            return 0;
        }
        else if(str.length<8){
            return 5;
        }
        else if(str.length<=10){
            return 10;
        }
        else{
            return 25;
        }
    }
    function letterStrength(str){
        var hasSmall=0;
        var hasBig=0;
        for(var i in str){
            var asc = str.charCodeAt(i);
            if(asc>=65&&asc<=90){
                hasBig=1;
            }
            else if(asc>=97&&asc<=122){
                hasSmall=1;
            }
        }
        var sum=hasSmall+hasBig;
        if(sum==0){
            return 0;
        }
        else if(sum==1){
            return 10;
        }
        else{
            return 25;
        }
    }
    function numberStrength(str){
        var cnt=0;
        for(var i in str){
            var asc = str.charCodeAt(i);
            if(asc>=48&&asc<=57){
                cnt++;
            }
        }
        if(cnt==0){
            return 0;
        }
        else if(cnt<=2){
            return 10;
        }
        else{
            return 20;
        }
    }
    function specialCharactersStrength(str){
        var cnt=0;
        for(var i in str){
            var asc = str.charCodeAt(i);
            if(!(asc>=48&&asc<=57)&&!(asc>=65&&asc<=90)&&!(asc>=97&&asc<=122)){
                cnt++;
            }
        }
        if(cnt==0){
            return 0;
        }
        else if(cnt==1){
            return 10;
        }
        else{
            return 25;
        }
    }
    function extraStrength(str){
        var hasSmall=false;
        var hasBig=false;
        var hasNumber=false;
        var hasSpecial=false;
        for(var i in str){
            var asc = str.charCodeAt(i);
            if(asc>=48&&asc<=57){
                hasNumber=true;
            }
            else if(asc>=65&&asc<=90){
                hasBig=true;
            }
            else if(asc>=97&&asc<=122){
                hasSmall=true;
            }
            else{
                hasSpecial=true;
            }
        }
        if((hasSmall||hasBig)&&hasNumber&&!hasSpecial){
            return 2;
        }
        else if(hasSmall&&hasBig&&hasNumber&&hasSpecial){
            return 5;
        }
        else if((hasSmall||hasBig)&&hasNumber&&hasSpecial){
            return 3;
        }
        else{
            return 0;
        }
    }
    function changePwdDown(value){;
        var strengthCnt=0;
        var failStyleStr='style="color:rgb(221, 7, 28);"';
        var successStyleStr='style="color:green;"';
        var pwdStrength=lengthStrength(value)+letterStrength(value)+numberStrength(value)
            +specialCharactersStrength(value)+extraStrength(value);
        var dataContentHtmlStr='<div>';
        dataContentHtmlStr+='<p style="padding-top:1rem;">你的密码必须包含：</p>';
        dataContentHtmlStr+='<p ';
        if(lengthStrength(value)>=10){
            dataContentHtmlStr+=successStyleStr;
            strengthCnt++;
        }
        else{
            dataContentHtmlStr+=failStyleStr;
        }
        dataContentHtmlStr+='><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;&nbsp;至少8个字符</p>';

        dataContentHtmlStr+='<p ';
        if(letterStrength(value)==25){
            dataContentHtmlStr+=successStyleStr;
            strengthCnt++;
        }
        else{
            dataContentHtmlStr+=failStyleStr;
        }
        dataContentHtmlStr+='><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;&nbsp;大写与小写字母</p>';

        dataContentHtmlStr+='<p ';
        if(numberStrength(value)>=10){
            dataContentHtmlStr+=successStyleStr;
            strengthCnt++;
        }
        else{
            dataContentHtmlStr+=failStyleStr;
        }
        dataContentHtmlStr+='><span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>&nbsp;&nbsp;至少一个数字</p>';
        dataContentHtmlStr+='<p>密码强度：</p>';
        dataContentHtmlStr+='<div class="progress">';
        dataContentHtmlStr+='<div class="progress-bar" role="progressbar progress-bar-striped active" aria-valuenow="'+pwdStrength+'" aria-valuemin="0" aria-valuemax="100" style="width: '+pwdStrength+'%;">';
        dataContentHtmlStr+='</div>';
        dataContentHtmlStr+='</div>';
        dataContentHtmlStr+='<p>避免使用您用于其他网站的密码或易用于被他人猜到的密码。</p>';
        dataContentHtmlStr+='</div>';
        $("#pwdDown").html(dataContentHtmlStr);
        if(strengthCnt==3){
            return true;
        }
        return false;
    }
    $(".isPassword").bind("input propertychange", function() {
        var value=$(this).val();
        if(changePwdDown(value)){
            $(this).parent().addClass("has-success").removeClass("has-error");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
        var pwdAgainValue=$("#DtgpwdAgainInput").val();
        if(value!=pwdAgainValue){
            $("#pwdErrorMsg").css("visibility","visible");
            $("#DtgpwdAgainInput").parent().removeClass("has-success").addClass("has-error");
        }
        else{
            $("#pwdErrorMsg").css("visibility","hidden");
            $("#DtgpwdAgainInput").parent().addClass("has-success").removeClass("has-error");
        }
        isAllSuccess();
    });
    $(".isPassword").focus(function (){
        var value=$(this).val();
        changePwdDown(value);
    });
}
function initNextBtn(){
    $.ajax({
        url: "ChangeUserInfoDataBaseServlet",
        type: "POST",
        data: {
            "action":"getHasID",
            "DtgID":$("#DtgIDInput").val()
        },
        dataType: "json",
        success: function (data){
            var chats=eval(data);
            if(chats.hasID){
                $("#DtgIDErrorMsg").css("visibility","hidden");
                $("#DtgIDInput").parent().addClass("has-success").removeClass("has-error");
                $("#afterNextBtn").css("display","block");
                $("#nextBtn").val("完成").attr("disabled","disabled");
            }
            else{
                $("#DtgIDErrorMsg").css("visibility","visible");
                $("#DtgIDInput").parent().removeClass("has-success").addClass("has-error");
                $("#DtgIDInput").focus();
            }
        },
        error:function (){
            alert("请求失败");
        }
    });
}
$(function () {
    //初始化
    init();
    addCheckInput();
    $("#nextBtn").click(initNextBtn);
    $("#SendEmailMsgBtn").click(function (){
        $.ajax({
            url: "SendEmailServlet",
            type: "POST",
            data: {
                "action":"changePwd",
                "to":$("#DtgIDInput").val()
            },
            dataType: "text",
            success: function (data){
                countBackwards=15000;
                timeID=setInterval(sendEmailOver,1000);
            },
            error:function (){
                alert("请求失败");
            }
        });
    });
    function sendEmailOver(){
        if(countBackwards==0){
            clearInterval(timeID);
            $("#SendEmailMsgBtn").val("验证邮箱");
            $("#SendEmailMsgBtn").removeAttr("disabled");
        }
        else{
            $("#SendEmailMsgBtn").attr("disabled","disabled");
            $("#SendEmailMsgBtn").val(countBackwards/1000+"秒可重发");
            countBackwards-=1000;
        }
    }
})