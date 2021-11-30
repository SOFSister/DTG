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
    //如果登录了获得username
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
    //初始化商品个数
    var data=getCartSessionJson();
    for (var prop in data) {
        var id = "";
        for (var i = 0; i < prop.length; ++i) {
            if (prop[i] == '!') {
                break;
            }
            id += prop[i];
        }
        var num=Number(data[prop]);
        var hasnum=Number($("#"+id).next().next().next().next().html());
        $("#"+id).next().next().next().next().html(hasnum+num);
    }
    //初始化减少商品
    $(".reduceBtn").click(function (){
        //$("#reduceModal").modal("show");
        //如果购买数量为0 不响应
        var aimID=$(this).prev().prev().prev().attr("id");
        var aimName=fromIdGetName(aimID);
        $("#reduceTable").html("<tr>\n" +
            "              <th>商品名</th>\n" +
            "              <th>口味</th>\n" +
            "              <th>数量</th>\n" +
            "              <th>操作</th>\n" +
            "            </tr>");
        //console.log(aimID,aimName);
        if($(this).next().html()==0){
            return;
        }
        else{
            //var data=getCartSessionJson();
            for (var prop in data) {
                var id = "";
                var need = "";
                var name = "";
                var flag = false;
                for (var i = 0; i < prop.length; ++i) {
                    if (prop[i] == '!') {
                        flag = true;
                        continue;
                    }
                    if (!flag) {
                        id += prop[i];
                    } else {
                        need += prop[i];
                    }
                }
                if(id==aimID){
                    $("#reduceTable").append("<tr>\n" +
                        "              <td>"+aimName+"</td>\n" +
                        "              <td>"+need+"</td>\n" +
                        "              <td>"+data[prop]+"</td>\n" +
                        "              <td><button class=\"doReduceBtn\">-1</button></td>\n" +
                        "            </tr>");
                }
            }
            $("#reduceModal").modal("show");
        }
    });
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
function getCartSessionJson(){
    var jsonData;
    $.ajax({
        url: "ProductsServlet",
        type: "POST",
        data: {
            "action":"getProducts",
        },
        async:false,
        dataType: "json",
        success: function (data){
            jsonData=data;
        },
        error:function (){
            alert("请求失败");
        }
    });
    return jsonData;
}
function fromIdGetName(id){
    var name;
    $.ajax({
        url: "ProductsServlet",
        type: "POST",
        data: {
            "action":"getProductsName",
            "id":id
        },
        async:false,
        dataType: "json",
        success: function (data){
            var chats=eval(data);
            name=chats.productName;
        },
        error:function (){
            alert("请求失败");
        }
    });
    return name;
}
function changeCart(data){
    var sumCart=0;
    var chats=eval(data);
    if(chats.empty){
        console.log("空");
    }
    else{
        $("#cartItems").html("");
        for (var prop in data){
            var id="";
            var need="";
            var name="";
            var flag=false;
            for(var i=0;i<prop.length;++i){
                if(prop[i]=='!'){
                    flag=true;
                    continue;
                }
                if(!flag){
                    id+=prop[i];
                }
                else{
                    need+=prop[i];
                }
            }
            name=fromIdGetName(id);
            sumCart+=data[prop];
            $("#cartItems").append('<div class="cart'+id+'">\n' +
                '                 <h3>\n' +
                name                 +'\n' +
                '                 </h3>\n' +
                '                 <h5 style="display: inline-block;">'+need+'&nbsp;x</h5>\n' +
                '                 <h4 style="display: inline-block;">'+data[prop]+'</h4>\n' +
                '                 </div>\n' +
                '                 <hr>');
            $("")
            //console.log("jsonObj[" + prop + "]=" + data[prop]);
        }
        $("#sumCart").html('购物车（'+sumCart+'）');
    }
    return sumCart;
}
function logout(){
    $.ajax({
        url: "LogoutServlet",
        type: "POST",
        data: {
        },
        async:false,
        dataType: "text",
        success: function (data){
        },
        error:function (){
            alert("请求失败");
        }
    });
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
        var productName=$('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h3').html();
        //id
        var productID=$('[class="col-sm-6 col-md-4"]:nth-of-type('+($selectedLocation+1)+') h3').attr("id");
        //needs
        var values=$("#modalForm").serializeArray();
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
                window.location.reload();
            },
            error:function (){
                alert("请求失败");
            }
        });
    });

    //判断是否登录
    $("#cart").focus(function (){
        if(islogin){
            htmlStr='<span class="glyphicon glyphicon-user" aria-hidden="true">\n' +
                '                                        <a id="logoutBtn" href="LogoutServlet" class="text-black">注销&nbsp'+userName+'</a>\n' +
                '                                    </span>';
            $("#loginChange").html(htmlStr);
            $("#logoutBtn").click(logout);
        }
        data=getCartSessionJson();
        //console.log(data);
        var sumCart=changeCart(data);
        $("#payBtn").click(function (){
            //判断是否登录
            if(loginID==""){
                alert("请先登录");
            }
            else if(sumCart==0){
                alert("请先添加商品");
            }
            else{

            }
        });
    });
});
