var lastEditBtn = "";
var html = "";

function mustEnter(obj) {
    ///Dtg ID
    var tdIDObj = $(obj).parent().prev().prev().prev().prev().prev().prev().prev();
    var preIDText = $(tdIDObj).html();

    //姓
    var tdLastNameObj = $(obj).parent().prev().prev().prev().prev().prev().prev();
    var preLastNameText = $(tdLastNameObj).children().val();

    //名
    var tdFirstNameObj = $(obj).parent().prev().prev().prev().prev().prev();
    var preFirstNameText = $(tdFirstNameObj).children().val();

    //省
    var tdProvinceObj = $(obj).parent().prev().prev().prev().prev();
    var preProvinceText = $(tdProvinceObj).children().val();

    //市
    var tdCityObj = $(obj).parent().prev().prev().prev();
    var preCityText = $(tdCityObj).children().val();

    //电话
    var tdPhoneNumberObj = $(obj).parent().prev().prev();
    var prePhoneNumberText = $(tdPhoneNumberObj).children().val();

    //状态
    var tdStatusObj = $(obj).parent().prev();
    var preStatusText = $(tdStatusObj).children().val();
    if (/*preIDText == "" || */preLastNameText == "" || preFirstNameText == "" || preProvinceText == "" ||
        preCityText == "" || prePhoneNumberText == "") {
        alert("必须填写完整信息才能更改");
        return false;
    }
    //后端修改
    var ischanged=false;
    $.ajax({
        url: "ChangeUserInfoDataBaseServlet",
        type: "POST",
        async:false,
        data: {
            "action":"updateUserinfo",
            "DtgID":preIDText,
            "LastName":preLastNameText,
            "FirstName": preFirstNameText,
            "Province":preProvinceText,
            "City":preCityText,
            "PhoneNumber":prePhoneNumberText,
            "IDStatus":preStatusText
        },
        dataType: "text",
        success: function (data){
            ischanged=true;
        },
        error:function (){
            alert("请求失败");
        }
    });
    if(!ischanged){
        return;
    }
    //前端修改
    console.log("修改了前端");
    $(obj).html("编辑");
    $(obj).removeClass("enterBtn").removeClass("btn-success").addClass("editBtn").addClass("btn-primary");
    $(obj).unbind('click');
    $(obj).click(edit);
    //$(tdIDObj).html(preIDText);
    $(tdLastNameObj).html(preLastNameText);
    $(tdFirstNameObj).html(preFirstNameText);
    $(tdProvinceObj).html(preProvinceText);
    $(tdCityObj).html(preCityText);
    $(tdPhoneNumberObj).html(prePhoneNumberText);
    $(tdStatusObj).html(preStatusText);
    lastEditBtn="";
    return true;
}

function enter(params) {
    //Dtg ID
    var tdIDObj = $(this).parent().prev().prev().prev().prev().prev().prev().prev();
    //var preIDText = $(tdIDObj).children().val();
    var preIDText = $(tdIDObj).html();

    //姓
    var tdLastNameObj = $(this).parent().prev().prev().prev().prev().prev().prev();
    var preLastNameText = $(tdLastNameObj).children().val();

    //名
    var tdFirstNameObj = $(this).parent().prev().prev().prev().prev().prev();
    var preFirstNameText = $(tdFirstNameObj).children().val();

    //省
    var tdProvinceObj = $(this).parent().prev().prev().prev().prev();
    var preProvinceText = $(tdProvinceObj).children().val();

    //市
    var tdCityObj = $(this).parent().prev().prev().prev();
    var preCityText = $(tdCityObj).children().val();

    //电话
    var tdPhoneNumberObj = $(this).parent().prev().prev();
    var prePhoneNumberText = $(tdPhoneNumberObj).children().val();

    //状态
    var tdStatusObj = $(this).parent().prev();
    var preStatusText = $(tdStatusObj).children().val();
    if (/*preIDText == "" || */preLastNameText == "" || preFirstNameText == "" || preProvinceText == "" ||
        preCityText == "" || prePhoneNumberText == "") {
        alert("必须填写完整信息才能更改");
        return;
    }
    //后端修改
    var ischanged=false;
    $.ajax({
        url: "ChangeUserInfoDataBaseServlet",
        type: "POST",
        async:false,
        data: {
            "action":"updateUserinfo",
            "DtgID":preIDText,
            "LastName":preLastNameText,
            "FirstName": preFirstNameText,
            "Province":preProvinceText,
            "City":preCityText,
            "PhoneNumber":prePhoneNumberText,
            "IDStatus":preStatusText
        },
        dataType: "text",
        success: function (data){
            ischanged=true;
        },
        error:function (){
            alert("请求失败");
        }
    });
    if(!ischanged){
        return;
    }
    //前端修改
    $(this).html("编辑");
    $(this).removeClass("enterBtn").removeClass("btn-success").addClass("editBtn").addClass("btn-primary");
    $(this).unbind('click');
    $(this).click(edit);
    //$(tdIDObj).html(preIDText);
    $(tdLastNameObj).html(preLastNameText);
    $(tdFirstNameObj).html(preFirstNameText);
    $(tdProvinceObj).html(preProvinceText);
    $(tdCityObj).html(preCityText);
    $(tdPhoneNumberObj).html(prePhoneNumberText);
    $(tdStatusObj).html(preStatusText);
}

function addCity() {
    var province = $("#change_province").val();
    var cityList = [];
    if (province == "") return;
    $("#change_city option").remove();
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
            //console.log(item)
            html += "<option value='" + item.regname + "' exid='" + item.regid + "'>" + item.regname + "</option>";

        });
    } else {
        html += "<option value='" + cityMessage[province_idx].regname + "' exid='" + cityMessage[province_idx].regid + "'>" + cityMessage[province_idx].regname + "</option>";

    }
    $("#change_city").append(html);
}

function edit(params) {
    if (lastEditBtn!=""&&$(lastEditBtn).parent().parent().attr("id") != $(this).parent().parent().attr("id")) {
        //console.log("和上次不同按钮");
        //console.log($(lastEditBtn).parent().parent().attr("id"));
        //console.log($(this).parent().parent().attr("id"));
        if(!mustEnter(lastEditBtn)){
            return;
        }
    }
    lastEditBtn = $(this);
    $(this).html("确认");
    $(this).removeClass("editBtn").removeClass("btn-primary").addClass("enterBtn").addClass("btn-success");
    $(this).unbind('click');
    $(this).click(enter);
    /*//Dtg ID
    var tdIDObj = $(this).parent().prev().prev().prev().prev().prev().prev().prev();
    var preIDText = tdIDObj.html();
    //得到当前文本内容
    var inputIDObj = $("<input type='text' />");
    //创建一个文本框元素
    tdIDObj.html(""); //清空td中的所有元素
    inputIDObj
        .width(tdIDObj.width())
        //设置文本框宽度与td相同
        //.height(tdIDObj.height())
        .val(preIDText)
        .appendTo(tdIDObj);*/

    //姓
    var tdLastNameObj = $(this).parent().prev().prev().prev().prev().prev().prev();
    var preLastNameText = tdLastNameObj.html();
    var inputLastNameObj = $("<input type='text' />");
    tdLastNameObj.html(""); //清空td中的所有元素
    inputLastNameObj
        .width(tdLastNameObj.width())
        //.height(tdLastNameObj.height())
        .val(preLastNameText)
        .appendTo(tdLastNameObj);

    //名
    var tdFirstNameObj = $(this).parent().prev().prev().prev().prev().prev();
    var preFirstNameText = tdFirstNameObj.html();
    var inputFirstNameObj = $("<input type='text' />");
    tdFirstNameObj.html(""); //清空td中的所有元素
    inputFirstNameObj
        .width(tdFirstNameObj.width())
        //.height(tdFirstNameObj.height())
        .val(preFirstNameText)
        .appendTo(tdFirstNameObj);

    //省
    var tdProvinceObj = $(this).parent().prev().prev().prev().prev();
    var preProvinceText = tdProvinceObj.html();
    var inputProvinceObj = $('<select name="input_province" id="change_province" style="width: 100%;height: 100%;"><option value="">--请选择--</option>' + html + '</select>');
    tdProvinceObj.html(""); //清空td中的所有元素
    inputProvinceObj
        .width(tdProvinceObj.width())
        //.height(tdProvinceObj.height())
        .val(preProvinceText)
        .appendTo(tdProvinceObj)
        .bind("input propertychange", addCity);

    //市
    var tdCityObj = $(this).parent().prev().prev().prev();
    var preCityText = tdCityObj.html();
    var inputCityObj = $('<select name="input_city" id="change_city" style="width: 100%;height: 100%;"><option value="">--请选择--</option></select>');
    //添加市
    tdCityObj.html(""); //清空td中的所有元素
    inputCityObj.appendTo(tdCityObj);
    addCity();
    $("#change_city").val(preCityText).width(tdCityObj.width())/*.height(tdCityObj.height())*/;

    //电话
    var tdPhoneNumberObj = $(this).parent().prev().prev();
    var prePhoneNumberText = tdPhoneNumberObj.html();
    var inputPhoneNumberObj = $("<input type='text' />");
    tdPhoneNumberObj.html(""); //清空td中的所有元素
    inputPhoneNumberObj
        .width(tdPhoneNumberObj.width())
        //.height(tdPhoneNumberObj.height())
        .val(prePhoneNumberText)
        .appendTo(tdPhoneNumberObj);

    //账户状态
    var tdStatusObj = $(this).parent().prev();
    var preStatusText = tdStatusObj.html();
    var inputStatusObj = $('<select name="" id="" style="width: 100%;height: 100%;"><option value="启用">启用</option><option value="禁用">禁用</option></select>');
    tdStatusObj.html(""); //清空td中的所有元素
    inputStatusObj
        .width(tdStatusObj.width())
        //.height(tdStatusObj.height())
        .val(preStatusText)
        .appendTo(tdStatusObj);
}
function dele() {
    //后端删除
    var ischanged=false;
    //后端改变
    $.ajax({
        url: "ChangeUserInfoDataBaseServlet",
        type: "POST",
        async:false,
        data: {
            "action":"deleteUserInfo",
            "DtgID":$(this).parent().parent().attr("id")
        },
        dataType: "text",
        success: function (data){
            ischanged=true;
        },
        error:function (){
            alert("请求失败");
        }
    });
    if(!ischanged){
        return;
    }
    //前端删除
    $(this).parent().parent().remove();
}
function query(){
    var IDText=$("#IDText").val();
    var lastNameText=$("#lastNameText").val();
    var firstNameText=$("#firstNameText").val();
    var input_province=$("#input_province").val();
    var input_city=$("#input_city").val();
    var phoneNumberText=$("#phoneNumberText").val();
    var statusText=$("#statusText").val();
    var users=$(".users");
    $.each(users, function (i, value) {
        if(IDText!=""&&IDText!=$(value).children("td").eq(0).html()||
            lastNameText!=""&&lastNameText!=$(value).children("td").eq(1).html()||
            firstNameText!=""&&firstNameText!=$(value).children("td").eq(2).html()||
            input_province!=""&&input_province!=$(value).children("td").eq(3).html()||
            input_city!=""&&input_city!=$(value).children("td").eq(4).html()||
            phoneNumberText!=""&&phoneNumberText!=$(value).children("td").eq(5).html()||
            statusText!=""&&statusText!=$(value).children("td").eq(6).html()){
            $(value).hide();
        }
        else{
            $(value).show();
        }
    });
}
$(function () {
    $(".editBtn").click(edit);
    $(".deleBtn").click(dele);
    $("#queryBtn").click(query);
    $("#resetBtn").click(function (){
        window.location.reload();
    });

    //地区选择

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
                console.log(item)
                html += "<option value='" + item.regname + "' exid='" + item.regid + "'>" + item.regname + "</option>";

            });
        } else {
        html += "<option value='" + cityMessage[province_idx].regname + "' exid='" + cityMessage[province_idx].regid + "'>" + cityMessage[province_idx].regname + "</option>";

        }
        $("#input_city").append(html);
    });
});