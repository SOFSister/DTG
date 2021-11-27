var islogin=false;
var loginID="";
var userName="";
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
    }
}
function getNeeds(values){
    var need="";
    if(values[0].value=="1"){
        need+="咸菜";
        if (values[1].value=="1"){
            need+="不辣";
        }
        else {
            need+="加辣";
        }
        if (values[3].value=="1"){
            need+="少面";
        }
        else if (values[3].value=="2"){
            need+="正常面";
        }
        else {
            need+="加面";
        }
    }
    else{
        need+="酱油";
        if (values[1].value=="1"){
            need+="不辣";
        }
        else {
            need+="加辣";
        }
        if (values[2].value=="1"){
            need+="不放糖";
        }
        else {
            need+="放糖";
        }
        if (values[3].value=="1"){
            need+="少面";
        }
        else if (values[3].value=="2"){
            need+="正常面";
        }
        else {
            need+="加面";
        }
    }
    return need;
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
        //商品存入session
        //name
        //console.log($('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h3').html());
        var productName=$('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h3').html();
        //id
        //console.log($('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h3').attr("id"));
        var productID=$('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h3').attr("id");
        //needs
        var values=$("#modalForm").serializeArray();
        /*console.log(values[0].name,values[0].value);
        console.log(values[1].name,values[1].value);
        console.log(values[2].name,values[2].value);
        console.log(values[3].name,values[3].value);*/
        var need=getNeeds(values);

        $.ajax({
            url: "ProductsServlet",
            type: "POST",
            data: {
                "action":"addCart",
                "name":productName,
                "id":productID,
                "need":need
            },
            async:false,
            dataType: "text",
            success: function (data){
                console.log("成功");
            },
            error:function (){
                alert("请求失败");
            }
        });
    });

    //减少商品

    //判断是否登录
    $("#cart").focus(function (){
        if(islogin){
            htmlStr='<span class="glyphicon glyphicon-user" aria-hidden="true">\n' +
                '                                        <a href="LogoutServlet" class="text-black">注销&nbsp'+userName+'</a>\n' +
                '                                    </span>';
            $("#loginChange").html(htmlStr);
        }
    });
});
