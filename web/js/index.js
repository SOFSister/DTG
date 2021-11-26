function init() {
    $('[data-toggle="popover"]').popover();
    $(".dropdown").mouseover(function () {
        $(this).addClass("open");
    });
    $(".dropdown").mouseleave(function () {
        $(this).removeClass("open");
    });
    //模态框选项切换
    $('#pickle').click(function (e) {
        $('#sweetness').hide();
    });
    $('#soySauce').click(function (e) {
        $('#sweetness').show();
    });
    var islogin=false;
    var loginID="";
    $.ajax({
        url: "GetSessions",
        type: "POST",
        data: {
            "action":"getLoginedID"
        },
        async:false,
        dataType: "json",
        success: function (data){
            var chats=eval(data);
            if(chats.loginedID!=""){//登录成功
                loginID=chats.loginedID;
                islogin=true;
            }
        },
        error:function (){
            alert("请求失败");
        }
    });
    //如果登录了修改样式
    if(islogin){
        var userName="";
        //查询名
        $.ajax({
            url: "ChangeUserInfoDataBaseServlet",
            type: "POST",
            data: {
                "action":"getFirstName",
                "DtgID":loginID
            },
            async:false,
            dataType: "json",
            success: function (data){
                var chats=eval(data);
                userName=chats.FirstName;
            },
            error:function (){
                alert("请求失败");
            }
        });
        console.log($("#cart").attr("data-content","<div>666</div>"));
        //$("#loginChange").html("666");
    }
}
$(function () {
    //初始化
    init();
    //搜索功能
    
    //添加商品
    $addCommodityBtn= $('[data-target="#myModal"]');//加号按钮
    $selectedLocation=1;//当前选中的位
    $.each($addCommodityBtn, function (index, value) { 
        $($addCommodityBtn[index]).click(function (e) { 
           $selectedLocation=index;
        });
    });
    $("#myModalEnterBtn").click(function (e) { 
        $nowVal=$('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h4:nth-of-type(2)').html();//获取当前商品个数
        $('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h4:nth-of-type(2)').html((1+Number($nowVal)));//设置新的商品个数+1
    });

    //减少商品
});
