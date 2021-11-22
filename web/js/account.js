function init() {
    $('[data-toggle="popover"]').popover();
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });
    $(".dropdown").mouseleave(function () {
        $(this).removeClass("open");
    })
}
function chooseArea(){
    //地区选择
    var html = "";
    var province_idx;
    $("#input_city").append(html);

    $.each(cityMessage, function (idx, item) {
        if (item.parid == '1') {
            html += "<option value='" + item.regname + "' exid='" + item.regid + "'>" + item.regname + "</option>";
        }

    });
    $("#input_province").append(html);
    $("#input_province").change(function (e) {
        var province = $(this).val();
        var cityList = [];
        if (province == "") return;
        $("#input_city option").remove();
        var html = "<option value=''>--请选择--</option>";

        //					获取已选择的省份的数组下标
        $.each(cityMessage, function (idx, item) {
            if (province == item.regname && item.parid == '1') {
                province_idx = idx
            }
        })

        //					获取已选择的省份的城市列表
        $.each(cityMessage, function (idx, item) {
            if (cityMessage[idx].parid == cityMessage[province_idx].regid) {
                cityList.push(cityMessage[idx])
            }
        })

        //					添加城市信息给标签
        if (cityList instanceof Array && cityList.length > 0) {
            $.each(cityList, function (idx, item) {
                html += "<option value='" + item.regname + "' exid='" + item.regid + "'>" + item.regname + "</option>";

            });
        } else {
            html += "<option value='" + cityMessage[province_idx].regname + "' exid='" + cityMessage[province_idx].regid + "'>" + cityMessage[province_idx].regname + "</option>";

        }
        $("#input_city").append(html);
    });
}
function addCheckInput(){
    $(".isEmpty").bind("input propertychange", function() {
        var value=$(this).val();
        if(value!=""){
            $(this).parent().addClass("has-success").removeClass("has-error");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
    });
    $(".isEmail").bind("input propertychange", function() {
        var value=$(this).val();
        var reg = /^\w+@([a-z0-9]{1,6})(\.[a-z]{2,3})+$/i;
        if(reg.test(value)){
            $(this).parent().addClass("has-success").removeClass("has-error");
            $("#IDErrorMsg").css("visibility","hidden");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
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
    function changePwdDown(value){
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
    });
    $(".isPassword").focus(function (){
        var value=$(this).val();
        changePwdDown(value);
    });
    $(".isAgainPwd").bind("input propertychange", function() {
        var value=$(this).val();
        if(value==""){
            return;
        }
        var aimValue=$(".isPassword").val();
        if(value!=aimValue){
            $("#pwdErrorMsg").css("visibility","visible");
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
        else{
            $("#pwdErrorMsg").css("visibility","hidden");
            $(this).parent().addClass("has-success").removeClass("has-error");
        }
    });
    $(".isPhoneNumber").bind("input propertychange", function() {
        var value=$(this).val();
        var reg = /^1[3456789]\d{9}$/
        if(reg.test(value)){
            $(this).parent().addClass("has-success").removeClass("has-error");
            $("#PhoneNumberErrorMsg").css("visibility","hidden");
        }
        else{
            $(this).parent().removeClass("has-success").addClass("has-error");
        }
    });

    $("#sendEmailMsgBtn").click(function (){
        if(!($(".isEmail").parent().hasClass("has-success"))){
            $("#inputEmail").parent().addClass("has-error");
            document.getElementById('inputLastName').scrollIntoView();
            $("#inputEmail").focus();
        }
        else{
            $.ajax({
                url: "SendEmailServlet",
                type: "POST",
                data: {
                    "to":$("#inputEmail").val()
                },
                dataType: "text",
                success: function (data) {
                    countBackwards=15000;
                    timeID=setInterval(sendEmailOver,1000);
                },
                error:function (){
                    alert("请求失败");
                }
            });
        }
    });
    function sendEmailOver(){
        if(countBackwards==0){
            clearInterval(timeID);
            $("#sendEmailMsgBtn").val("发送验证码");
            $("#sendEmailMsgBtn").removeAttr("disabled");
        }
        else{
            $("#sendEmailMsgBtn").attr("disabled","disabled");
            $("#sendEmailMsgBtn").val(countBackwards/1000+"秒后可重新发送");
            countBackwards-=1000;
        }
    }
}
$(function () {
    //初始化
    init();
    //选择地区
    chooseArea();
    //判断是否输入正确
    addCheckInput();

    $("#newCode").click(function (){
        $.ajax({
            url: "image.jsp",
            type: "GET",
            data: {

            },
            dataType: "text",
            success: function (data) {
                $("#image").attr("src","image.jsp");
            },
            error:function (){
                alert("请求失败");
            }
        });
    });

    $("#nextBtn").click(function (){
        var isAllSuccess=true;
        var allInput=$(".form-control");
        $.each(allInput, function (i, value) {
            if(i>0){
                if(!$(value).parent().hasClass("has-success")){
                    isAllSuccess=false;
                    if(i<=4){
                        document.getElementById("inputSelect").scrollIntoView();
                    }
                    else if(i>4&&i<=7)
                        document.getElementById('inputLastName').scrollIntoView();
                    else{
                        document.getElementById("input_city").scrollIntoView();
                    }
                    $(value).parent().addClass("has-error");
                    $(value).focus();
                    return false;
                }
            }
        });
        if(isAllSuccess){
            $.ajax({
                url: "CheckCodeServlet",
                type: "POST",
                data: {
                    "code":$("#inputImgCode").val(),
                    "EmailCode":$("#inputEmailCode").val(),
                    "EmailID":$("#inputEmail").val()
                },
                dataType: "json",
                success: function (data) {
                    var chats=eval(data);
                    if(!chats.imgCode){
                        $("#inputImgCode").parent().addClass("has-error").removeClass("has-success");
                        $("#imgErrorMsg").css("visibility","visible");
                        $.ajax({
                            url: "image.jsp",
                            type: "GET",
                            data: {

                            },
                            dataType: "text",
                            success: function (data) {
                                $("#image").attr("src","image.jsp");
                            },
                            error:function (){
                                alert("请求失败");
                            }
                        });
                    }
                    else{
                        $("#imgErrorMsg").css("visibility","hidden");
                    }
                    if(!chats.emailCode){
                        $("#inputEmailCode").parent().addClass("has-error").removeClass("has-success");
                        $("#emailErrorMsg").css("visibility","visible");
                    }
                    else{
                        $("#emailErrorMsg").css("visibility","hidden");
                    }
                    if(chats.imgCode&&chats.emailCode){
                        $.ajax({
                            url: "ChangeUserInfoDataBaseServlet",
                            type: "POST",
                            data: {
                                "action":"add",
                                "DtgID":$("#inputEmail").val(),
                                "LastName":$("#inputLastName").val(),
                                "FirstName":$("#inputFirstName").val(),
                                "Province":$("#input_province").val(),
                                "City":$("#input_city").val(),
                                "PhoneNumber":$("#inputPhoneNumber").val(),
                                "PassWord":$("#inputPwd").val()
                            },
                            dataType: "json",
                            success: function (data) {
                                var chats=eval(data);
                                console.log(chats.hasID,chats.hasPhoneNumber);
                                if(chats.hasID||chats.hasPhoneNumber){
                                    if(chats.hasPhoneNumber){
                                        document.getElementById('inputLastName').scrollIntoView();
                                        $("#inputPhoneNumber").parent().addClass("has-error").removeClass("has-success");
                                        $("#PhoneNumberErrorMsg").css("visibility","visible");
                                        $("#inputPhoneNumber").focus();
                                    }
                                    if(chats.hasID){
                                        document.getElementById('inputLastName').scrollIntoView();
                                        $("#inputEmail").parent().addClass("has-error").removeClass("has-success");
                                        $("#IDErrorMsg").css("visibility","visible");
                                        $("#inputEmail").focus();
                                    }
                                    $.ajax({
                                        url: "image.jsp",
                                        type: "GET",
                                        data: {

                                        },
                                        dataType: "text",
                                        success: function (data) {
                                            $("#image").attr("src","image.jsp");
                                        },
                                        error:function (){
                                            alert("请求失败");
                                        }
                                    });
                                }
                                else{
                                    $("#mainSection").append('<div class="alert alert-success" role="alert"><strong>注册成功，</strong>即将跳转到登录界面...</div>');
                                    $("#nextBtn").attr("disabled","disabled");
                                    setTimeout(function (){
                                        window.location.href="login.jsp";
                                    },2000);
                                }
                            },
                            error:function (){
                                alert("请求失败");
                            }
                        });
                    }
                },
                error:function (){
                    alert("请求失败");
                }
            });
        }
    });
});